'use strict'

const Telegram=require('telegram-node-bot');
var dotenv = require('dotenv');

class PingController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        console.log($)
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

module.exports = PingController;