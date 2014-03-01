#!/bin/bash

echo "Installing pm2"
sudo npm install -g pm2

echo "Creating init script"
sudo cp init-ubuntu /etc/init.d/expressmvc
sudo chmod a+x /etc/init.d/expressmvc
sudo update-rc.d expressmvc defaults

echo "Attemping to start SimpleLogs"
sudo service expressmvc start

