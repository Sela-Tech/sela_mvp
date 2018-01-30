'use strict'

const Telegram=require('telegram-node-bot');

class RegisterController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    registerHandler($) {
        var query = $.message.text
        var query_terms = $.message.text.split(' ')
        console.log($.message.chat.id)
        var chat_id = $.message.chat.id
        var error_message = 'Please structure correctly your query. It must follow the format /register sela_username'
        if (query_terms.length!=2) {
            $.sendMessage(error_message)
        }
        else {
            var username = query_terms[1] 
            $.sendMessage('You are attempting to register user ' + username + ' and the chat id is: '+chat_id)
        }
        
    }

    get routes() {
        return {
            'registerCommand': 'registerHandler'
        }
    }
}

module.exports = RegisterController;