#!/bin/sh

curl -v -H "Content-Type: application/json" -d @sample_login_user_data.json -X POST https://sela-labs.herokuapp.com/login
