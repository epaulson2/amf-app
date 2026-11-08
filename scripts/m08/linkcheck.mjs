import fs from 'node:fs'
import path from 'node:path'
let n = 0, bad = []
const files = ['docs/m08/README.md', ...fs.readdirSync('docs/m08/review').map(f => 'docs/m08/review/' + f)]
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8')
  for (const m of t.matchAll(/\]\(([^)\s]+)\)|src="([^"]+)"/g)) {
    const u = m[1] ?? m[2]; if (/^https?:/.test(u)) continue
    n++; if (!fs.existsSync(path.join(path.dirname(f), u.split('#')[0]))) bad.push(f + ' -> ' + u)
  }
}
console.log('relative links', n, 'broken', bad.length, bad.slice(0, 10))
