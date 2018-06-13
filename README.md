Endpoint Configuration

#Verify-Token
Basically A login But With Token
request header: {
"x-access-token" : String
}

#Login
Request Type: POST
request header: {
"x-access-token" : String
}
request body: {
username: String,
password: String
}

#Signup
Request Type: POST
Request Body: {
email: String,
firstname: String,
surname:String,
password: String,
phoneNumber: String,
sign-up-type: String,
}
