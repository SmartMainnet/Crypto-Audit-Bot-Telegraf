const Composer = require('telegraf')

const composer = new Composer()

exports.helpCommand = composer.command('help', async ctx => {
  try {
    await ctx.replyWithPhoto(
      { source: 'src/images/Example.png' },
      {
        caption: ctx.i18n.t('help'),
        parse_mode: 'MARKDOWN'
      }
    )
  } catch (e) {
    console.log(e)
  }
})