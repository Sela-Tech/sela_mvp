# settings.py
import os
from os.path import join, dirname
from dotenv import load_dotenv
import telegram 
from telegram.ext import Updater
from telegram.error import NetworkError, Unauthorized
import logging
from time import sleep
import pymongo
from stellar_base.builder import Builder
from stellar_base.asset import Asset
from collections import defaultdict
import gridfs


# Accessing variables.
dotenv_path = join(dirname(__file__), '.env')
print(dotenv_path)
load_dotenv(dotenv_path)
telegram_token = os.getenv('SELA_BOT_API')
print(telegram_token)
mongo_uri = os.getenv('MONGOLAB_URI')
client = pymongo.MongoClient(mongo_uri)
db = client.get_default_database()
sela_issuer = os.getenv('ISSU_PUB_KEY')
dest_address = os.getenv('LUM_WALL')
sender_s_key = os.getenv('DIST_SEC_KEY')
amount = 1
index_task = None

seed = sender_s_key
builder = Builder(secret=seed, network='public')
# builder = Builder(secret=seed, network='public') for LIVENET
bob_address = dest_address
amount = 0.1
memo = os.getenv('MEMO')
token = os.getenv('SELA_TOKEN')
builder.append_payment_op(bob_address, amount, token,sela_issuer)
builder.add_text_memo(memo) # string length <= 28 bytes
builder.sign()
# Uses an internal horizon instance to submit over the network
builder.submit()

users = db['users']
Bisike = users.find({'first_name': 'Bisike'})
for us in Bisike:
    print(us)
query = {'first_name': 'Bisike'}
users.update(query, {'$set': {'telegram_id': 'test'}})

# Using variables.
print(telegram_token)
bot = telegram.Bot(token=telegram_token)
updater = Updater(token=telegram_token)
dispatcher = updater.dispatcher
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO)

fs = gridfs.GridFS(db)

"""Simple Bot to reply to Telegram messages.
This is built on the API wrapper, see echobot2.py to see the same example built
on the telegram.ext bot framework.
This program is dedicated to the public domain under the CC0 license.
"""

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

import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)

REGISTER, REGISTER_HANDLER, UPLOAD_TYPE, INTERVIEW, TASK_REPORT, TASK_UPLOAD, TASK_UPDATE_RECEIVE, QUESTION_TASK, NEW_UPLOAD,  PHOTO_TRANSCRIPT,VIDEO, PHOTO, VIDEO_SUCCESS, TRANSCRIPT, END= range(15)

Interview_Type = 'Interview'
Task_Report_Type = 'Task Report'
Interview_Instruction = 'You chose interview. There are 2 ways to upload interview. Video or Photo+Transcript. Pick:'
Video = 'Video'
Photo_Transcript = 'Photo + Transcript'
Other = 'Other'
End = 'End'
New_Video = 'New Video'
New_Photo_Transcript = 'New Photo'
Video_Instruction = 'You chose to upload your interview in video format. Please upload your video'
Photo_Instruction = 'You chose to upload your interview in photo + transcript format. Please upload your photo now then your transcript'
Task_Report_Instruction_Success ='You chose task report. Please choose the project for which you are reporting'
User_Not_Found_Message = 'Hello, I do not recognize you. Please register by sending over your Sela user name. Would you like to register ?'
Register_Instruction = 'Register'
tasks_for_user = {}
current_task_upload_for_user = defaultdict(int)
current_file_for_user = {}
YES = 'YES'
NO = 'NO'




def start(bot, update):

    chat_id = update.message.chat.id
    reply_keyboard = [[Interview_Type, Task_Report_Type, 'Other']]
    users = db['users'].find({'telegram_id': chat_id})
    count = users.count() 
    if count == 0:
        reply_keyboard = [[Register_Instruction, Other]]
        update.message.reply_text(User_Not_Found_Message,
        reply_markup= ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))
        return REGISTER 
    elif count == 1:
        ''' Find user and hold conversation with him also think about time outs'''
        update.message.reply_text(
        'Hi '+str(update.message.chat.first_name)+' !My name is Sela Bot. I will hold a conversation with you. '
        'Send /cancel to stop talking to me.\n\n'
        'Are you here to upload an interview or a Task Report ?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))
        return UPLOAD_TYPE
    else :
        return END

def register(bot, update):
    ''' Handle user registration '''
    registration = update.message.text
    register_prompt = 'Great ! We will register you now. Provide your user name on the Sela platform'
    if registration == Register_Instruction:
        update.message.reply_text(register_prompt,reply_markup=ReplyKeyboardRemove())
        return REGISTER_HANDLER
    else : 
        return END 

def register_handler(bot,update):
    ''' Handle user registration '''
    user_name = update.message.text
    users_query = db['users'].find({'user_name': user_name})
    count = users_query.count()
    if count == 0:
        error_message = 'Sorry, we did not find the corresponding user. Would you like to try again'
        reply_keyboard = ['Yes','No']
        update.message.reply_text(error_message,reply_markup=reply_keyboard)
        return REGISTRATION_ERROR
    elif count == 1:
        query = {'user_name': user_name}
        users.update_one(query, {'$set': {'telegram_id': update.message.chat.id}})
        success_message = 'Congratulations, you have been registered. Your account has been linked to Sela. To start a conversation, press /start'
        update.message.reply_text(success_message,reply_markup = ReplyKeyboardRemove())
    else :
        return END




def upload_type(bot, update):
    Task_Report_Instruction = 'Pick the project you want to report about'
    upload = update.message.text
    if(upload== Interview_Type):
        reply_keyboard = [[Video, Photo_Transcript]]
        update.message.reply_text(
            Interview_Instruction,
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))
        return INTERVIEW 
    elif(upload == Task_Report_Type):
        #Load user's projects and include them in the keyboard.
        current_user_query = db['users'].find({'telegram_id': update.message.chat.id})
        count = current_user_query.count()
        if count == 1:
            for c in current_user_query:
                current_user = c
        project_for_user = db['projects'].find({'project_name': 'SI Pilot 2'})
        #current_user_id = current_user['_id']
        #project_for_user = db['project_observers'].find({'observers.observer_id': current_user_id})
        reply_keyboard= []
        for found_project in project_for_user:
            print(found_project)
            reply_keyboard.append([found_project['project_name']])
        print(reply_keyboard)
        update.message.reply_text(
            Task_Report_Instruction,
            reply_markup=ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True)
        )
        return TASK_REPORT

def task_report(bot,update):
    '''Todo : Grab Telegram ID, From ID grab user, from user grab projects and present list of project'''
    project_name = update.message.text
    project_for_user = db['projects'].find_one({'project_name': project_name})
    print(project_for_user)
    tasks_for_project = db['tasks'].find({'project':project_for_user['_id']}).sort("due_date",pymongo.ASCENDING)
    tasks_for_user[update.message.chat.id] = tasks_for_project
    num_option = tasks_for_project.count()
    print(num_option)
    Task_Message = 'Here are all the pending tasks for this project. Pick the number for the task you want :+ \n '
    for i in range(1, num_option+1):
        Task_Message += str(i)+'.' + ' ' + tasks_for_project[i-1]['task_name'] + ' \n '
    options = range(1,num_option+1)
    options = [str(o) for o in options]
    reply_keyboard = [options]
    update.message.reply_text(
        Task_Message,
        reply_markup=ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True)
    )
    return TASK_UPLOAD

def task_upload(bot,update):
    #Get task title and invite user to upload
    index_task = int(update.message.text)-1
    current_task_upload_for_user[update.message.chat.id] = tasks_for_user[update.message.chat.id][index_task]
    name_of_task = tasks_for_user[update.message.chat.id][index_task]['task_name']
    Invite_message = 'Thanks for choosing task : + \n '+name_of_task + ' \n Attach picture or Video now'
    update.message.reply_text(
        Invite_message,
        reply_markup = ReplyKeyboardRemove())
    return TASK_UPDATE_RECEIVE

def task_update_receive(bot, update):
    #Get task title
    final_message = ''
    reply_keyboard = [[YES, NO]]
    print(update.message)
    first_name = update.message.chat.first_name
    last_name = update.message.chat.last_name
    date = str(update.message.date)
    file_name = first_name + '_' + last_name + '_' + date 
    if (update.message.video):
        video_file = bot.get_file(update.message.video.file_id)
        video_file.download(file_name+'.mp4')
        current_file_for_user[update.message.chat.id] = file_name+'.mp4'
        final_message = 'Thanks for uploading the video. One more question, was this task done ?'
        update.message.reply_text(
            final_message,
            reply_markup= ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True))
        return QUESTION_TASK 
    elif (update.message.photo):
        photo_file = bot.get_file(update.message.photo[-1].file_id)
        photo_file.download(file_name+'.jpg')
        current_file_for_user[update.message.chat.id] = file_name+'.jpg'
        #file_py = open(file_name+'.jpg')
        #with open(file_name+'.jpg') as my_image:
        #    fs.put(my_image, content_type="image/jpeg", filename=file_name)
        print('Went into photo')
        final_message = 'Thanks for uploading the picture. One more question, was this task done ?'
        update.message.reply_text(
            final_message,
            reply_markup= ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True))
        return QUESTION_TASK
    else:
        return END

def question_task(bot, update):
    answer = update.message.text
    if answer == YES:
        task_status = True
    else:
        task_status = False 
    verifications = db['verifications']
    renew_message = 'Thanks ! We received your evidence and it is stored on the platform. Would you like to submit a new evidence ?'
    task = current_task_upload_for_user[update.message.chat.id]
    current_user = db['users'].find_one({'telegram_id': update.message.chat.id})
    user_id = current_user['_id']
    observation = {}
    observation['sender'] = current_user['_id']
    observation['task'] = task['_id']
    observation['task_status'] = task_status
    observation['project'] = task['project']
    observation['file_name'] = current_file_for_user[update.message.chat.id]
    verifications.insert(observation)

    #Payment
    public_key = current_user['public_key']
    seed = sender_s_key
    builder = Builder(secret=seed, network='public')
    # builder = Builder(secret=seed, network='public') for LIVENET
    bob_address = public_key
    amount = 0.1
    memo = os.getenv('MEMO')
    token = os.getenv('SELA_TOKEN')
    builder.append_payment_op(bob_address, amount, token,sela_issuer)
    builder.add_text_memo(memo) # string length <= 28 bytes
    builder.sign()
    # Uses an internal horizon instance to submit over the network
    builder.submit()
    reply_keyboard = [[YES, NO]]
    update.message.reply_text(
            renew_message,
            reply_markup= ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True))
    return NEW_UPLOAD  

def renew_upload(bot,update):
    '''Asks user if wants to upload data again'''
    new_upload = update.message.text
    if new_upload == YES:
        return TASK_REPORT
    else:
        user = update.message.from_user
        logger.info("User %s ended the conversation.", user.first_name)
        update.message.reply_text("Thanks for these observation, " + str(user.first_name)+ " Talk to you later !",
                                  reply_markup=ReplyKeyboardRemove())
        return ConversationHandler.END


def get_observation_type_task(bot,update):
    ''' Todo : Ask observation in video, photo, or testimonial
    You picked this task, what observation  
    Photo , Video '''
    return True
def get_observation_status(bot,update):
    ''' Todo : Given observation ask whether it confirms a task is done or not
    Get video put it on gridfs , Create verification linking user ; task ; project ; 
    Send user money '''
    return True

def interview(bot, update):
    media_type = update.message.text
    if(media_type== Video):
        reply_keyboard = [[Video, Photo_Transcript]]
        update.message.reply_text(
            Video_Instruction,
            reply_markup=ReplyKeyboardRemove())
        return VIDEO 
    elif(upload == Photo_Transcript):
        #Load user's projects and include them in the keyboard.
        update.message.reply_text(Task_Report_Instruction_Success, replk)
        return TASK_REPORT 

def video(bot, update):
    video_file = bot.get_file(update.message.video.file_id)
    video_file.download('temp.mp4')
    video_thanks= 'Thanks for uploading this interview. You can decide to upload a new video, a photo + transcript or end'
    reply_keyboard = [[New_Video, New_Photo_Transcript, End]]
    update.message.reply_text(
        video_thanks,
        reply_markup=ReplyKeyboardMarkup(reply_keyboard,one_time_keyboard=True))
    return VIDEO_SUCCESS
def video_success(bot, update):
    new_submission = update.message.text
    if(new_submission== New_Video):
        update.message.reply_text(
            Video_Instruction,
            reply_markup=ReplyKeyboardRemove())
        return VIDEO 
    elif(new_submission == New_Photo_Transcript):
        #Load user's projects and include them in the keyboard.
        update.message.reply_text(Task_Report_Instruction_Success, replk)
        return TASK_REPORT 
    elif(new_submission == End):
        return END


def photo(bot, update):
    user = update.message.from_user
    photo_file = bot.get_file(update.message.photo[-1].file_id)
    photo_file.download('user_photo.jpg')
    logger.info("Photo of %s: %s", user.first_name, 'user_photo.jpg')
    update.message.reply_text('Gorgeous! Now, send me your location please, '
                              'or send /skip if you don\'t want to.')

    return LOCATION


def skip_photo(bot, update):
    user = update.message.from_user
    logger.info("User %s did not send a photo.", user.first_name)
    update.message.reply_text('I bet you look great! Now, send me your location please, '
                              'or send /skip.')

    return LOCATION


def location(bot, update):
    user = update.message.from_user
    user_location = update.message.location
    logger.info("Location of %s: %f / %f", user.first_name, user_location.latitude,
                user_location.longitude)
    update.message.reply_text('Maybe I can visit you sometime! '
                              'At last, tell me something about yourself.')

    return BIO


def skip_location(bot, update):
    user = update.message.from_user
    logger.info("User %s did not send a location.", user.first_name)
    update.message.reply_text('You seem a bit paranoid! '
                              'At last, tell me something about yourself.')

    return BIO


def bio(bot, update):
    user = update.message.from_user
    logger.info("Bio of %s: %s", user.first_name, update.message.text)
    update.message.reply_text('Thank you! I hope we can talk again some day.')

    return ConversationHandler.END


def end(bot, update):
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    update.message.reply_text('Bye! I hope4 we can talk again some day.',
                              reply_markup=ReplyKeyboardRemove())

    return ConversationHandler.END

def cancel(bot, update):
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    update.message.reply_text('Bye! I hope4 we can talk again some day.',
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

    # Add conversation handler with the states GENDER, PHOTO, LOCATION and BIO
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],

        states={
            UPLOAD_TYPE: [RegexHandler('^(Interview|Task Report|Other)$', upload_type)],
            INTERVIEW: [RegexHandler('^(Video|Photo + Transcript)$', interview)],
            REGISTER: [RegexHandler('^(Register|Other)$', register)],
            REGISTER_HANDLER: [MessageHandler(Filters.text, register_handler)],
            TASK_REPORT: [MessageHandler(Filters.text, task_report)],
            TASK_UPLOAD: [MessageHandler(Filters.text, task_upload)],
            TASK_UPDATE_RECEIVE: [MessageHandler(Filters.video | Filters.photo, task_update_receive)],
            QUESTION_TASK: [RegexHandler('^(YES|NO)$',question_task)],
            NEW_UPLOAD: [RegexHandler('^(YES|NO)$',renew_upload)],
            VIDEO: [MessageHandler(Filters.video, video)],
            VIDEO_SUCCESS: [RegexHandler('^(New Video| New Photo + Transcript|End)$', video_success)],
            END : [RegexHandler('End', end)] 
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

    '''        PHOTO: [MessageHandler(Filters.photo, photo),
                    CommandHandler('skip', skip_photo)],

            LOCATION: [MessageHandler(Filters.location, location),
                       CommandHandler('skip', skip_location)],

            BIO: [MessageHandler(Filters.text, bio)]'''

    updater.idle()


if __name__ == '__main__':
    main()