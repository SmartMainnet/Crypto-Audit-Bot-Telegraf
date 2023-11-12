const path = require('path')
const TelegrafI18n = require('telegraf-i18n')

const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  allowMissing: false,
  directory: path.resolve(`${process.cwd()}/src`, 'locales')
})

exports.i18nMiddleware = i18n.middleware()