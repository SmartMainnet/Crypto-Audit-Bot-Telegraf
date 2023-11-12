const { checkMember } = require('./checkMember.middleware')
const { checkChains } = require('./checkChains.middleware')

module.exports = {
  checkMember,
  checkChains
}