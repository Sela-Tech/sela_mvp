var token = "token_here";
var telegramURL = "https://api.telegram.org/bot"+ token;
var webAppUrl = "webapp_here";
var spreadsheet_id = "spreadsheet_id";

function getMe() {
  var url = telegramURL + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());

}

function setWebHook() {
  var url = telegramURL + "/setWebHook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function deleteWebHook() {
  var url = telegramURL + "/deleteWebHook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramURL + "/sendMessage?chat_id=" + id+"&text="+text;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e) {
  // this is where telegram works
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name+ " " + data.message.chat.last_name;
  var answer = "";
  if (text.charAt(0)==='T') {
     answer = "Great, what task is that for ?";
  } else if (text.charAt(0)=== 'I') {
     answer = "Thank you, your verification has been recorded. Your ticket id is *";
  } else 
  {
     answer = "Hi "+ " " + name + " what project is this submission for ?";
  }
  sendText(id,answer);
}