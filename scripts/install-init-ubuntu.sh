#!/bin/bash

echo "Installing pm2"
sudo npm install -g pm2

echo "Creating init script"
sudo cp init-ubuntu /etc/init.d/simplelogs
sudo chmod a+x /etc/init.d/simplelogs
sudo update-rc.d simplelogs defaults

echo "Attemping to start SimpleLogs"
sudo service simplelogs start

