'use strict'

const Telegram=require('telegram-node-bot');

class RegisterController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    registerHandler($) {
        console.log($._update._message);
        $.sendMessage('register')
    }

    get routes() {
        return {
            'registerCommand': 'registerHandler'
        }
    }
}

module.exports = RegisterController;