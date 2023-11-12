const Composer = require('telegraf')

const composer = new Composer()

exports.infoCommand = composer.command('info', async ctx => {
  try {
    await ctx.reply(
      ctx.i18n.t('info'),
      { disable_web_page_preview: true }
    )
  } catch (e) {
    console.log(e)
  }
})