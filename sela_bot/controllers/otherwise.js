'use strict'

const Telegram=require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
    	console.log($._update._message);
        $.sendMessage('Sorry I don\'t understand');
    }
}

module.exports = OtherwiseController;