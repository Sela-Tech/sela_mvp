'use strict'

const Telegram=require('telegram-node-bot');
var dotenv = require('dotenv');
var mongoose = require('mongoose');


dotenv.config();
var mongoDB = process.env.MONGOLAB_URI;
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Compiling models
var User = mongoose.model('users');
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
            User.find({ 'user_name': username },'first_name family_name')
                .exec(function (err) {
                    if (err) {
                        console.log('No user with that name');
                    }
                    console.log('success');
                });

        }
        
    }

    get routes() {
        return {
            'registerCommand': 'registerHandler'
        }
    }
}

module.exports = RegisterController;