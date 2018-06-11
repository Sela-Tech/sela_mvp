#!/bin/sh

curl -v -H "Content-Type: application/json" -H "X-Access-Token: $1" -d @sample_get_tasks_data.json -X GET https://sela-labs.herokuapp.com/tasks
