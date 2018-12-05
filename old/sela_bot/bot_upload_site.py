#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Simple Bot to reply to Telegram messages
# This program is dedicated to the public domain under the CC0 license.
"""
This Bot uses the Updater class to handle the bot.
First, a few callback functions are defined. Then, those functions are passed to
the Dispatcher and registered at their respective places.
Then, the bot is started and runs until we press Ctrl-C on the command line.
Usage:
Example of a bot-user conversation using ConversationHandler.
Send /start to initiate the conversation.
Press Ctrl-C on the command line or send a signal to the process to stop the
bot.
"""

from telegram import (ReplyKeyboardMarkup, ReplyKeyboardRemove)
from telegram.ext import (Updater, CommandHandler, MessageHandler, Filters, RegexHandler,
                          ConversationHandler)

import os
from os.path import join, dirname
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
from dotenv import load_dotenv
import telegram
import pymongo
import datetime
import boto3
import boto
from boto.s3.connection import S3Connection
from boto.s3.key import Key
   


# Accessing variables.


dotenv_path = join(dirname(__file__), '.env')
print(dotenv_path)
load_dotenv(dotenv_path)
telegram_token = os.getenv('SELA_BOT_API')
print(telegram_token)



evidence_name = ''

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)
mongo_uri = os.getenv('MONGO_URI')
print(mongo_uri)
client = pymongo.MongoClient(mongo_uri)
db = client.get_default_database()

print(db)

Lat, Long = 0,0

lat_long = db['site_registration']

PHOTO, LOCATION, SITE_REG = range(3)

post = {
            "latitude": Lat,
            "longitude": Long,
            "evidence_name": evidence_name
}




def start(bot, update):
    user = update.message.from_user
    first_name = user.first_name
    post['author'] = str(user.first_name)
    post['datetime'] = str(datetime.datetime.utcnow())
    Location_message = 'Hello ' + str(first_name) + ' Would you please like to send me a picture or enter /skip if you do not want to'
    update.message.reply_text(Location_message)
    return PHOTO

def photo(bot, update):
    user = update.message.from_user
    photo_file = bot.get_file(update.message.photo[-1].file_id)
    evidence_name = str(user.first_name) + '_' + str(user.last_name) + '_' + str(datetime.datetime.utcnow()) + '.jpg'
    post['evidence_name'] = str(evidence_name)
    photo_file.download(evidence_name)
    aws_access = os.getenv('AWSaccessKeyId')
    aws_secret = os.getenv('AWSsecretAccessKey')
    conn = S3Connection(str(aws_access), str(aws_secret))
    bucket_name = os.getenv('BUCKET_UPLOAD')
    bucket = conn.create_bucket(bucket_name,
        location=boto.s3.connection.Location.DEFAULT)
    k = Key(bucket)
    testfile = evidence_name
    k.key = evidence_name
    k.set_contents_from_filename(testfile)    
    logger.info("Photo of %s: %s", user.first_name, evidence_name)
    update.message.reply_text('Gorgeous! Now, send me your location please, '
                              'or send /skip if you don\'t want to.')

    return LOCATION


def skip_location(bot, update):
    user = update.message.from_user
    logger.info("User %s did not send a location.", user.first_name)
    update.message.reply_text('You seem a bit paranoid! '
                              'At last, tell me something about yourself.')

    return SITE_REG


def location(bot, update):
    user = update.message.from_user
    user_location = update.message.location
    Lat, Long = user_location.latitude, user_location.longitude
    post['latitude'] = user_location.latitude
    post['longitude'] = user_location.longitude

    logger.info("Location of %s: %f / %f", user.first_name, user_location.latitude,
                user_location.longitude)
    update.message.reply_text('Thank you for sending your location, what is the name of the site ?')
    return SITE_REG




def skip_photo(bot, update):
    user = update.message.from_user
    post['evidence_name'] = str(None) 
    logger.info("User %s did not send a photo.", user.first_name)
    update.message.reply_text('I bet you look great! Now, send me your location please, '
                              'or send /skip.')

    return LOCATION


def site_reg(bot, update):
    user = update.message.from_user
    site_name = update.message.text
    print(post)
    post2 = {}
    post2['latitude'] = post['latitude']
    post2['longitude'] = post['longitude']
    post2['evidence_name'] = post['evidence_name']
    post2['author'] = post['author']
    post2['site_name'] = site_name
    print(post2)
    logger.info("Site of %s: %s", user.first_name, update.message.text)
    update.message.reply_text('Thank you! I hope we can talk again some day.')
    lat_long.insert_one(post2)

    return ConversationHandler.END


def cancel(bot, update):
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    update.message.reply_text('Bye! I hope we can talk again some day.',
                              reply_markup=ReplyKeyboardRemove())

    return ConversationHandler.END


def error(bot, update, error):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, error)


def main():
    # Create the EventHandler and pass it your bot's token.
    updater = Updater(telegram_token)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # Add conversation handler with the states PHOTO, LOCATION and SITE_REG
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],

        states={
            LOCATION: [MessageHandler(Filters.location, location),
                       CommandHandler('skip', skip_location)],

            PHOTO: [MessageHandler(Filters.photo, photo),
                    CommandHandler('skip', skip_photo)],

            SITE_REG: [MessageHandler(Filters.text, site_reg)],
        },

        fallbacks=[CommandHandler('cancel', cancel)]
    )

    dp.add_handler(conv_handler)

    # log all errors
    dp.add_error_handler(error)

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == '__main__':
    main()