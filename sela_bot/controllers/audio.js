'use strict'

const Telegram=require('telegram-node-bot');

class AudioController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    audioHandler($) {
        console.log($)
        $.sendMessage('audio')
    }

    get routes() {
        return {
            'audioCommand': 'audioHandler'
        }
    }
}

module.exports = AudioController;