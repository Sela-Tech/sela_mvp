'use strict'
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();
var telegram_api = process.env.SELA_BOT_API;
console.log(telegram_api);
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const CustomFilterCommand = Telegram.CustomFilterCommand
const tg = new Telegram.Telegram(telegram_api, {
	workers:1
});
const PingController = require('./controllers/ping'), 
	  RegisterController = require('./controllers/register_user'),
	OtherwiseController = require('./controllers/otherwise'),
	AudioController = require('./controllers/audio'),
	TasksController = require('./controllers/tasks');

tg.router.when(new TextCommand('/ping', 'pingCommand'),new PingController())
		 .when(new TextCommand('/register', 'registerCommand'), new RegisterController())
		 .when(new TextCommand('/tasks','tasksCommand'), new TasksController())
		 .otherwise(new OtherwiseController());