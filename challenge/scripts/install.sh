#!/bin/bash

#Precondition: node executable is installed and in $PATH

version=$(node -v | cut -d'.' -f 2)
DIR_FILE="$(dirname "${BASH_SOURCE[0]}" )"
ROOT=$(dirname $DIR_FILE)

if [ "$version" != "12" ]; then
	curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
	sudo apt-get install -y nodejs
fi

bower -v &>/dev/null
if [ "$?" != 0 ]; then
	sudo npm install -g bower
fi

gulp -v &>/dev/null
if [ "$?" != 0 ]; then
	sudo npm install -g gulp
fi

if [ -e scripts/stubs/.env.generic ] && [ ! -e "$ROOT/.env" ]; then
	cp scripts/stubs/.env.generic "$ROOT/.env"
	php artisan key:generate
fi

composer install
php artisan migrate
npm install && bower install | xargs echo
gulp
