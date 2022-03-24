#!/bin/sh

RED='\033[0;31m'
BLUE='\033[0;34m'
STRONG_WHITE='\033[97m\033[97m'
STRONG_BLUE='\033[94m\033[94m'
YELLOW='\033[0;33m'
STRONG_YELLOW='\033[93m\033[93m'
BOLD='\033[1m\033[1m'
UL='\033[4m'
NC='\033[0m' # No Color

printf "============================================================\n"

printf "${BOLD}${STRONG_YELLOW}Please ensure your ${UL}${STRONG_BLUE}environment variables${NC}${STRONG_YELLOW} are set correctly.${NC}\n"
xset -dpms     # disable DPMS (Energy Star) features.
xset s off     # disable screen saver
xset s noblank # don't blank the video device
matchbox-window-manager -use_titlebar no &
unclutter &    # hide X mouse cursor unless mouse activated

case $1 in

--secure | -s | --https)
    printf "${BOLD}${STRONG_BLUE}Secure mode${NC}\n"
    printf "${BOLD}${STRONG_YELLOW}Please ensure that you have a valid certificate and key in the ${STRONG_BLUE}/.keys ${STRONG_YELLOW}directory.${NC}\n"
    printf "${BOLD}${STRONG_YELLOW}You will need to have a properly configured custom ${STRONG_BLUE}DNS${STRONG_YELLOW} and ${STRONG_BLUE}port forwarding${STRONG_YELLOW} for this option to work${NC}\n"
    sudo nodemon 443 --secure # start node server on port 443 in secure mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 https://picalendar.ddns.net/
    ;;

--debug | --dev | -d)
    printf "${BOLD}${RED}Development mode${NC}\n"
    sudo nodemon 443 --localhost-secure # start node server on port 8080 in dev mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 https://127.0.0.1/
    ;;

*)
    printf "${BOLD}${STRONG_WHITE}Local Host mode${NC}\n"
    sudo nodemon 8080 --localhost # start node server on port 8080 in localhost mode
    chromium-browser --display=:0 --kiosk --window-position=0,0 http://127.0.0.1:8080/
    ;;
esac

printf "${BOLD}${STRONG_YELLOW}Kiosk mode started with state: ${1}${NC}\n"
printf "============================================================\n"