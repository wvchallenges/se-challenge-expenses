#!/bin/bash

#Precondition: node executable is installed and in $PATH

version=$(node -v | cut -d'.' -f 2)

if [ "$version" != "12" ]; then
	curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
	sudo apt-get install -y nodejs
fi
