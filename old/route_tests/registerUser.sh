#!/bin/sh

curl -v -H "Content-Type: application/json" -d @sample_register_user_data.json -X POST https://sela-labs.herokuapp.com/register
