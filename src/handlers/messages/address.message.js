const { Composer } = require('telegraf')

const { checkChains, checkMember } = require('../../middlewares/checks')
const { audit } = require('../../utils')

const composer = new Composer()
const address = /^(0x)?[0-9a-f]{40}$/i

exports.addressMessage = composer.hears(
  address,
  checkMember,
  checkChains,
  ctx => audit(ctx)
)