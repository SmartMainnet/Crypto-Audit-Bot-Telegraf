const { Composer } = require('telegraf')

const composer = new Composer()

exports.textMessage = composer.hears(/.*/, ctx => {
  ctx.reply(ctx.i18n.t('only_contracts'))
})