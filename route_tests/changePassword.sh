#!/bin/sh

curl -v -H "Content-Type: application/json" -H "X-Access-Token: $1" -d @sample_change_password_data.json -X POST https://sela-labs.herokuapp.com/changePassword
