#!/bin/sh

curl -v -H "Content-Type: application/json" -H "X-Access-Token: $1" -X GET https://sela-labs.herokuapp.com/projects
