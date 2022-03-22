#!/bin/sh

echo "Please ensure your environment variables are set correctly."
xset -dpms     # disable DPMS (Energy Star) features.
xset s off     # disable screen saver
xset s noblank # don't blank the video device
matchbox-window-manager -use_titlebar no &
unclutter &    # hide X mouse cursor unless mouse activated

case $1 in

--secure | -s | --https)
    echo "Secure mode"
    echo "Please ensure that you have a valid certificate and key in the /.keys directory."
    echo "You will need to have a properly configured custom DNS and port forwarding for this option to work"
    sudo nodemon 443 --secure # start node server on port 443 in secure mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 https://picalendar.ddns.net/
    ;;

--debug | --dev | -d)
    echo "Development mode"
    sudo nodemon 443 --localhost-secure # start node server on port 8080 in dev mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 https://127.0.0.1/
    ;;

*)
    echo "Local Host mode"
    sudo nodemon 8080 --localhost # start node server on port 8080 in localhost mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 http://127.0.0.1:8080/
    ;;
esac

echo "Kiosk mode started with state: ${1}"