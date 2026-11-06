#!/usr/bin/env python3
"""1B step 1 must be answer-neutral: no higher C / C5 / next C / octave / arrival wording in the text, any alt text or the page title."""
import re, sys, urllib.request, html as H
base = sys.argv[1].rstrip('/') + '/curriculum/soundscape-path/week-1/lesson-1b'
h = urllib.request.urlopen(base + '?step=1', timeout=120).read().decode(); scene = h[h.find('class="m4"'):h.find('<footer')]
text = H.unescape(re.sub(r'<[^>]+>', ' ', scene)); alts = ' '.join(re.findall(r'alt="([^"]*)"', scene)); title = re.search(r'<title>(.*?)</title>', h).group(1)
bad = [p for p in ['higher C', 'C5', 'next C', 'eighth', 'arrive', 'arrival', 'octave'] if re.search(p, text + ' ' + alts + ' ' + title, re.I)]
h2 = urllib.request.urlopen(base + '?step=2', timeout=120).read().decode()
reveal = bool(re.search('next C', H.unescape(re.sub(r'<[^>]+>', ' ', h2[h2.find('class="m4"'):h2.find('<footer')]))))
print('step 1 leaks:', bad or 'none', '| step 2 reveals the answer:', reveal)
sys.exit(0 if not bad and reveal else 1)
