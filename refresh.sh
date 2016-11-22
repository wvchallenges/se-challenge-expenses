#!/bin/bash

php -d memory_limit=1024M ./app/console cache:clear --no-warmup
php -d memory_limit=1024M ./app/console cache:warmup
