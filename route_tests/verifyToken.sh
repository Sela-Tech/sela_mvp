#!/bin/sh

curl -v -H "Content-Type: application/json" -H "X-Access-Token: $1" -X POST https://sela-labs.herokuapp.com/verifyToken
