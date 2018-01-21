'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('bot_token', {
	workers:1
});
const PingController = require('./controllers/ping'), 
	OtherwiseController = require('./controllers/otherwise');

tg.router.when(new TextCommand('/ping', 'pingCommand'),new PingController())
	.otherwise(new OtherwiseController());