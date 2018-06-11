#!/bin/sh

curl -v -H "Content-Type: application/json" -d @sample_register_user_data.json -X POST https://sela-labs.herokuapp.com/register
# curl -v -H "Content-Type: application/json" -d '{"firstName":"Yadi", "familyName":"Lichi", "username":"yadilichiuname1", "publicKey":"yadilichipubKey1", "userTypes":'["Funder"]', "password":"yadilichipass1"}' -X POST https://sela-labs.herokuapp.com/register
