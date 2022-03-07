#!/bin/sh

if test $# -eq 0
then
    echo "No name on command line."
    exit 1
fi

echo $1
NAME=$1
echo $NAME

echo $NAME | sudo tee  /etc/hostname

sudo sed -i -e 's/^.*hostname-setter.*$//g' /etc/hosts
echo "127.0.0.1      " $NAME " ### Set by hostname-setter"  | sudo tee -a /etc/hosts

sudo service hostname.sh stop
sudo service hostname.sh start

echo "Hostname set."
echo "You can use the command line to set the hostname at anytime using the following command:"
echo "sudo hostname.sh <hostname>"
echo "Rebooting machine in 15 seconds"
sleep 15
sudo reboot