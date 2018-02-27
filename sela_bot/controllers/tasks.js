'use strict'

const Telegram=require('telegram-node-bot');

class TasksController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    tasksHandler($) {
        var first_name = $.message.from.first_name
        var last_name = $.message.from.last_name
        var name = first_name+ ' '+ last_name
        console.log(name)
        $.sendMessage('Hello, are attempting to register user ' + name)
    }

    get routes() {
        return {
            'tasksCommand': 'tasksHandler'
        }
    }
}

module.exports = TasksController;