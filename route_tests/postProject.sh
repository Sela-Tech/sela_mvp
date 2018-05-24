#!/bin/sh

curl -v -H "Content-Type: application/x-www-form-urlencoded" -d @sample_post_project_data.json -X POST https://sela-labs.herokuapp.com/project
