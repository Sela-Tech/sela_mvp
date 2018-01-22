'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('bot_token', {
	workers:1
});
const PingController = require('./controllers/ping'), 
	  RegisterController = require('./controllers/register_user'),
	OtherwiseController = require('./controllers/otherwise');

tg.router.when(new TextCommand('/ping', 'pingCommand'),new PingController())
		 .when(new TextCommand('/register', 'registerCommand'), new RegisterController())
	.otherwise(new OtherwiseController());