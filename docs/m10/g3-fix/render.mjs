import sharp from '/home/elderle/amf-work/amf-ajourne-m10/node_modules/sharp/lib/index.js'
const [,, i, o] = process.argv
await sharp(i, { density: 72 }).resize(1122, 1402).png().toFile(o)
