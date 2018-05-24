#!/bin/sh

curl -v -H "Content-Type: application/json" -d '{"depositingBank":'$1', "asset":"USD", "value":'$2'}' -X POST http://localhost:$APL_PORT/deposit
