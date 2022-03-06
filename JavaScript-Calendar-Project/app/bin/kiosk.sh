#!/bin/sh
xset -dpms     # disable DPMS (Energy Star) features.
xset s off     # disable screen saver
xset s noblank # don't blank the video device
matchbox-window-manager -use_titlebar no &
unclutter &    # hide X mouse cursor unless mouse activated
sudo npm start --prefix /home/pi/JavaScript-Calendar-Project/App/
chromium-browser --display=:0 --kiosk --window-position=0,0 https://localhost:4443/