'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const CustomFilterCommand = Telegram.CustomFilterCommand
const tg = new Telegram.Telegram('454763768:AAH6lEz_5ozoXqKrtgSnkBrEstdp98jOiE0', {
	workers:1
});
const PingController = require('./controllers/ping'), 
	  RegisterController = require('./controllers/register_user'),
	OtherwiseController = require('./controllers/otherwise'),
	AudioController = require('./controllers/audio');

tg.router.when(new TextCommand('/ping', 'pingCommand'),new PingController())
		 .when(new TextCommand('/register', 'registerCommand'), new RegisterController())
		 .when(new CustomFilterCommand($ => {return $.message.audio != null}, 'audioCommand'),new AudioController())
		 .otherwise(new OtherwiseController());