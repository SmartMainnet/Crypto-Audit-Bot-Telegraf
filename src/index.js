require('dotenv').config()
const { Telegraf } = require('telegraf')

const { i18nMiddleware, limitMiddleware } = require('./middlewares/plugins')
const { startCommand, infoCommand, helpCommand } = require('./handlers/commands')
const { addressMessage, textMessage } = require('./handlers/messages')
const { buttonCallback } = require('./handlers/callbacks')
require('./database/connect/db.connect')

const { BOT_TOKEN } = process.env

const bot = new Telegraf(BOT_TOKEN)

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.use(startCommand)
bot.use(infoCommand)
bot.use(helpCommand)

// messages
bot.use(addressMessage)
bot.use(textMessage)

// callbacks
bot.use(buttonCallback)

bot.launch()