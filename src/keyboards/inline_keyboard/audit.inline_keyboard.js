const Telegraf = require('telegraf')

const { Markup } = Telegraf

exports.auditInlineKeyboard = (chain, address) => {
  return Markup.inlineKeyboard([
    Markup.urlButton(
      'Audit',
      `https://gopluslabs.io/token-security/${chain.id}/${address}`
    ),
    Markup.urlButton(
      'Contract',
      `${chain.scan}${address}`
    ),
    Markup.urlButton(
      'Buy',
      `https://app.1inch.io/#/${chain.id}/simple/swap/${chain.coin}/${address}`
    ),
    Markup.urlButton(
      'Chart',
      `https://${chain.name === 'BSC' ? 'poocoin.app/tokens' : 'coingecko.com/en/coins'}/${address}`
    ),
  ], { columns: 2 })
}