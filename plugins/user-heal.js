import db from '../lib/database.js'
import { join } from 'path'
import { promises } from 'fs'

let handler = async (m, { args, conn, usedPrefix, __dirname }) => {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = db.data.users[m.sender]
    if (user.health >= 100) return conn.sendButton(m.chat, `*––––『 FULL HEALTH 』––––*`, `
ʏᴏᴜʀ ❤️health ɪs ғᴜʟʟ﹗

===========================
`.trim(), './media/fullhealth.jpg',
[
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`],
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, { asLocation: true })
    const heal = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
    if (user.potion < count) return conn.sendButton(m.chat,`
*–『 INSUFFICIENT POTION 』–*`, 
`ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴜʏ *${count - user.potion}* ᴍᴏʀᴇ *🥤ᴩᴏᴛɪᴏɴ* ᴛᴏ ʜᴇᴀʟ.
ʏᴏᴜ'ᴠᴇ *${user.potion} 🥤ᴩᴏᴛɪᴏɴ* ɪɴ ʙᴀɢ.

===========================
'ʙᴜʏ🥤ᴩᴏᴛɪᴏɴ' | 'ᴀsᴋ ᴛᴏ ᴀʟʟ'
===========================
`.trim(), './media/lowpotion.jpg', [
[`ʙᴜʏ ᴩᴏᴛɪᴏɴ`, `${usedPrefix}buy potion ${count - user.potion}`],
[`ᴀsᴋ ᴛᴏ ᴀʟʟ`, `${usedPrefix}tagall *sᴏᴍᴇʙᴏᴅʏ ᴩʟᴇᴀsᴇ sᴇɴᴅ ${count - user.potion} ᴩᴏᴛɪᴏɴ* ᴛᴏ ᴍᴇ.
⮕ ᴛᴏ ᴛʀᴀɴsғᴇʀ ᴩᴏᴛɪᴏɴ:
${usedPrefix}transfer potion ${count - user.potion} @${conn.getName(m.sender)}`]
], m, {asLocation: true})
    user.potion -= count * 1
    user.health += heal * count
    conn.sendButton(m.chat, `*––––『 FULL RECOVER 』––––*`, `
sᴜᴄᴄᴇssғᴜʟʟʏ *${count} 🥤ᴩᴏᴛɪᴏɴ* ᴜsᴇ ᴛᴏ ʀᴇᴄᴏᴠᴇʀ ʜᴇᴀʟᴛʜ.

===========================
`.trim(), './media/healthrecover.jpg',
[
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`],
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, { asLocation: true })
}

handler.help = ['heal']
handler.tags = ['User']
handler.command = /^(heal)$/i

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}