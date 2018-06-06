#!/bin/sh

curl -v -H "Content-Type: application/json" -d @sample_get_tasks_data.json -X GET https://sela-labs.herokuapp.com/tasks
