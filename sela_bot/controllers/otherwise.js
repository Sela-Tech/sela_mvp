'use strict'

const Telegram=require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Sorry I don\'t understand');
    }
}

module.exports = OtherwiseController;