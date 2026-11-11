#!/usr/bin/env python3
"""Read-only pull of ONE Drive folder (AMF "Week 2 Infographic Drafts 2026-11-10") into a scoped local inbox.

Separate from the Game pull script on purpose: different folder id, different inbox, PNG and ZIP only.
  * rclone `copy` only (never sync/move/delete), scope drive.readonly, one fixed root folder id, top level only.
  * The service-account key is never read, printed or logged here; rclone reads it. Missing/loose key: AUTH_PENDING.
  * Staging -> validate (safe name, magic bytes, size, PNG dimensions, optional expected hash) -> inbox + SHA256SUMS.
  * ZIPs are listed and extracted only into a fresh directory with path-traversal, symlink, absolute-path,
    size and file-count protection; anything unsafe rejects the whole ZIP.
Exit codes: 0 ok, 2 validation failure, 3 AUTH_PENDING, 4 rclone failure.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import stat
import struct
import subprocess
import sys
import zipfile
from pathlib import Path

FOLDER_ID = "1Mlc0sZFlKqmrHOooHnv39R4v3jdN9Q8a"  # "Week 2 Infographic Drafts 2026-11-10"
KEY_PATH = Path.home() / ".config/qcr-shared-assets/service-account.json"
BASE = Path.home() / "amf-work/amf-evidence/w2-infographics-20261110"
INBOX = BASE / "inbox"
STAGING = BASE / ".staging"
EXTRACT = BASE / "zip-extract"
ALLOWED_EXT = ("png", "zip")
MAX_BYTES = 120 * 1024 * 1024
MAX_PNG_DIM = 12000
ZIP_MAX_FILES = 400
ZIP_MAX_TOTAL = 400 * 1024 * 1024
NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._ -]{0,119}$")


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()


def png_dims(p: Path):
    with p.open("rb") as f:
        head = f.read(32)
    if head[:8] == b"\x89PNG\r\n\x1a\n" and head[12:16] == b"IHDR":
        return struct.unpack(">II", head[16:24])
    return None


def validate(d: Path):
    ok, bad = [], []
    for p in sorted(d.iterdir()):
        ext = p.suffix.lstrip(".").lower()
        if p.is_symlink() or not p.is_file():
            bad.append((p.name, "not a regular file")); continue
        if not NAME_RE.match(p.name) or ext not in ALLOWED_EXT:
            bad.append((p.name, "name/extension not allowed")); continue
        size = p.stat().st_size
        if size == 0 or size > MAX_BYTES:
            bad.append((p.name, f"size {size} out of range")); continue
        rec = {"name": p.name, "sha256": sha256(p), "bytes": size, "type": ext}
        if ext == "png":
            dims = png_dims(p)
            if not dims or max(dims) > MAX_PNG_DIM:
                bad.append((p.name, "magic bytes are not a PNG or dimensions too large")); continue
            rec["width"], rec["height"] = dims
        else:
            with p.open("rb") as f:
                if f.read(4) != b"PK\x03\x04":
                    bad.append((p.name, "magic bytes are not a ZIP")); continue
        ok.append(rec)
    return ok, bad


def safe_extract(z: Path, out: Path):
    """Extract only if every member is a plain relative file under out. Returns a list of member records."""
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(mode=0o700, parents=True)
    root = out.resolve()
    recs, total = [], 0
    with zipfile.ZipFile(z) as zf:
        infos = zf.infolist()
        if len(infos) > ZIP_MAX_FILES:
            raise ValueError("too many files in ZIP")
        for i in infos:
            name = i.filename
            mode = (i.external_attr >> 16) & 0xFFFF
            if name.startswith("/") or "\\" in name or ".." in Path(name).parts or re.match(r"^[A-Za-z]:", name):
                raise ValueError(f"unsafe path in ZIP: {name!r}")
            if mode and stat.S_ISLNK(mode):
                raise ValueError(f"symlink in ZIP: {name!r}")
            target = (out / name).resolve()
            if root not in target.parents and target != root:
                raise ValueError(f"path escapes extraction dir: {name!r}")
            total += i.file_size
            if total > ZIP_MAX_TOTAL:
                raise ValueError("ZIP expands beyond size limit")
            if i.is_dir():
                target.mkdir(parents=True, exist_ok=True); continue
            target.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(i) as src, target.open("wb") as dst:
                shutil.copyfileobj(src, dst)
            recs.append({"member": name, "bytes": i.file_size, "sha256": sha256(target)})
    return recs


def main() -> int:
    if not KEY_PATH.is_file():
        print(f"AUTH_PENDING: no service-account key at {KEY_PATH}. Nothing was fetched."); return 3
    if KEY_PATH.stat().st_mode & 0o077:
        print(f"AUTH_PENDING: {KEY_PATH} must be mode 600."); return 3
    BASE.mkdir(parents=True, exist_ok=True, mode=0o700)
    INBOX.mkdir(exist_ok=True, mode=0o700)
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir(mode=0o700)
    remote = f":drive,scope=drive.readonly,root_folder_id={FOLDER_ID},service_account_file={KEY_PATH}:"
    listing = subprocess.run(["rclone", "lsjson", remote, "--max-depth", "1", "--config", "/dev/null"], capture_output=True, text=True)
    if listing.returncode != 0:
        print("rclone lsjson failed (exit %d); first line: %s" % (listing.returncode, (listing.stderr.strip().splitlines() or [""])[0][:200])); return 4
    (BASE / "drive-listing.json").write_text(listing.stdout)
    cmd = ["rclone", "copy", remote, str(STAGING), "--max-depth", "1", "--max-size", str(MAX_BYTES), "--drive-skip-gdocs", "--no-traverse", "--ignore-case", "--config", "/dev/null"]
    for ext in ALLOWED_EXT:
        cmd += ["--include", f"*.{ext}"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("rclone copy failed (exit %d); first line: %s" % (r.returncode, (r.stderr.strip().splitlines() or [""])[0][:200])); return 4
    ok, bad = validate(STAGING)
    for rec in ok:
        shutil.move(str(STAGING / rec["name"]), str(INBOX / rec["name"]))
    shutil.rmtree(STAGING, ignore_errors=True)
    zips = {}
    for rec in ok:
        if rec["type"] == "zip":
            try:
                zips[rec["name"]] = safe_extract(INBOX / rec["name"], EXTRACT)
            except Exception as e:  # reject the whole ZIP
                bad.append((rec["name"], f"ZIP rejected: {e}"))
    (INBOX / "SHA256SUMS.txt").write_text("\n".join(f"{r['sha256']}  {r['name']}" for r in sorted(ok, key=lambda x: x["name"])) + "\n")
    (BASE / "receipt.json").write_text(json.dumps({"folder_id": FOLDER_ID, "accepted": ok, "rejected": bad, "zip_members": zips}, indent=1))
    print(json.dumps({"accepted": len(ok), "rejected": bad, "zip_member_counts": {k: len(v) for k, v in zips.items()}}, indent=1))
    return 0 if not bad else 2


if __name__ == "__main__":
    sys.exit(main())
