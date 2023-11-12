const { checkChainsInlineKeyboard } = require('../../keyboards/inline_keyboard')
const { getChains } = require('../../utils')

exports.checkChains = async (ctx, next) => {
  try {
    const msgWait = await ctx.reply(ctx.i18n.t('checking'))
    const message_id = ctx.update.message.message_id
    const from = ctx.update.message.from
    const address = ctx.update.message.text.toLowerCase()
    const chains = (await getChains(address)).filter(chain => chain.status)

    if (chains.length === 1) {
      ctx.msgWait = msgWait
      ctx.user = from
      ctx.address = address
      ctx.chain = chains[0]
      ctx.telegram.editMessageText(
        msgWait.chat.id,
        msgWait.message_id,
        undefined,
        ctx.i18n.t('audit')
      )
      next()
    } else if(chains.length > 1) {
      ctx.telegram.editMessageText(
        msgWait.chat.id,
        msgWait.message_id,
        undefined,
        ctx.i18n.t('chain_selection'),
        {
          parse_mode: 'MARKDOWN',
          reply_to_message_id: message_id,
          disable_web_page_preview: true,
          reply_markup: checkChainsInlineKeyboard(chains, address)
        }
      )
    } else {
      ctx.reply(ctx.i18n.t('only_contracts'))
    }
  } catch (e) {
    console.log(e)
  }
}