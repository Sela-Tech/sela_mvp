'use strict'

var dotenv = require('dotenv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
dotenv.config();
var mongoDB = process.env.MONGOLAB_URI;

const Telegram=require('telegram-node-bot');
class ViewProjectController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    viewProjectsHandler($) {
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
           
            mongoose.connect(mongoDB, {
              useMongoClient: true
            });
            mongoose.Promise = global.Promise;
            var db = mongoose.connection;
            console.log("Connection established");
            var UserModel = mongoose.model('User', new Schema({ first_name: String , family_name: String}));
            var ChatModel = mongoose.model('Chat', new Schema({ 
                telegramId: String, 
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }));

            UserModel.find({"first_name":username}, function(error, result) { 
                if (error) {
                    error_message = "Error in the request";
                    $.sendMessage(error_message);
                }
                if (result.length ==0){
                    error_message = "Sorry, " + username + " is not a correct username";
                    $.sendMessage(error_message);
                }
                else {
                    console.log(result);
                    $.sendMessage("Good");
                }
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