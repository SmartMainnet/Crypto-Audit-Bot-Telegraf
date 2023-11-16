const { audit, chainList } = require('../../utils')

exports.buttonCallback = async ctx => {
  try {
    const data = ctx.update.callback_query.data
    const msgWait = ctx.update.callback_query.message
    const user = ctx.update.callback_query.from

    const address = data.split(' ')[1]
    const chainName = data.split(' ')[0]

    const chain = chainList.filter(chain => chain.name === chainName)[0]
    
    ctx.msgWait = msgWait
    ctx.user = user
    ctx.address = address
    ctx.chain = chain
    ctx.editMessageText(ctx.i18n.t('audit'))
  
    audit(ctx)
  } catch (e) {
    console.log(e)
  }
}