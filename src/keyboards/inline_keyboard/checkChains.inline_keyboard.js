const Telegraf = require('telegraf')

const { Markup } = Telegraf

exports.checkChainsInlineKeyboard = (chains, address) => {
  const buttonRow = chains.map(chain =>
    Markup.callbackButton(chain.name, `${chain.name} ${address}`)
  )
  return Markup.inlineKeyboard([buttonRow], { columns: 2 })
}