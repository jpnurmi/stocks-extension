// '<b>{name}</b><br/><small>{quote}{currency} <em>({change}{currency} | {percent}%)</em></small>'
//
// [
//   { text: '{name}', flags: Set { 'b' } },
//   { flags: Set { 'br' } },
//   { text: '{quote}{currency} ', flags: Set { 'small' } },
//   { text: '({change}{currency} | {percent}%)', flags: Set { 'small', 'em' } }
// ]
function parseRichText(text) {
  let pos = 0
  let blocks = []
  let flags = new Set()

  const tags = text.matchAll(/<.*?>/g)

  function addBlock({ text, flags }) {
    if (text) {
      blocks.push({ text: text, flags: new Set(flags) })
    }
  }

  for (const tag of tags) {
    addBlock({ text: text.slice(pos, tag.index), flags: flags })
    pos = tag.index + tag[0].length

    if (tag[0].endsWith('/>')) {
      // standalone tag (e.g. <br/>)
      blocks.push({ flags: new Set([tag[0].slice(1, -2)]) })
    } else if (tag[0].startsWith('</')) {
      // closing tag (e.g. </b>)
      flags.delete(tag[0].slice(2, -1))
    } else {
      // opening tag (e.g. <b>)
      flags.add(tag[0].slice(1, -1))
    }
  }
  addBlock({ text: text.slice(pos), flags: flags })

  return blocks
}
