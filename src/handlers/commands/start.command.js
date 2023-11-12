const Composer = require('telegraf')

const { createUser } = require('../../database/methods')

const composer = new Composer()

exports.startCommand = composer.command('start', async ctx => {
  try {
    const from = ctx.update.message.from
    await ctx.reply(ctx.i18n.t('start', { first_name: ctx.me.first_name }))

    await ctx.reply(
      ctx.i18n.t('info'),
      { disable_web_page_preview: true }
    )

    await ctx.replyWithPhoto(
      { source: 'src/images/Example.png' },
      {
        caption: ctx.i18n.t('help'),
        parse_mode: 'MARKDOWN'
      }
    )

    createUser(from)
  } catch (e) {
    console.log(e)
  }
})