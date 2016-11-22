#!/bin/bash

echo "--- Update OS package list ---"
function aptget {
  # to prevent encoding problem
  sudo DEBIAN_FRONTEND=noninteractive apt-get \
    -o Dpkg::Options::="--force-confdef" \
    -o Dpkg::Options::="--force-confold" \
    $@ -y
}
aptget update
aptget dist-upgrade

echo "--- Cleaning Packages ---"
sudo apt-get autoremove --purge -y 

echo "--- Restarting Apache ---"
sudo service apache2 restart

echo "--- Start Consumer ---"
cd /vagrant;
./app/console rabbitmq:consumer -w expensefile &