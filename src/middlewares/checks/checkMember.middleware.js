const { CHANNEL } = process.env

exports.checkMember = async (ctx, next) => {
  try {
    const userId = ctx.update.message.from.id
  
    if (CHANNEL) {
      const join = await ctx.telegram.getChatMember(CHANNEL, userId)
      const isJoined = join.status !== 'left'
  
      if (isJoined) {
        next()
      } else {
        ctx.reply(
          ctx.i18n.t('only_members', { CHANNEL: CHANNEL.replace('@', '') }),
          { parse_mode: 'MARKDOWN' }
        )
      }
    } else {
      next()
    }
  } catch (e) {
    console.log(e)
  }
}