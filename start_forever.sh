#!/bin/bash

cd /home/devko/web

/usr/local/bin/forever start -w server.js > output.log 
