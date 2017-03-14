#!/bin/bash

heroku config:set METEOR_SETTINGS="$(cat settings.json)"

git add . -A

echo Enter commit message ...
read var_cmsg

git commit -m "'$var_cmsg'"

git push heroku master
