#!/bin/sh

RED='\033[0;31m'
STRONG_BLUE='\033[94m\033[94m'
STRONG_YELLOW='\033[93m\033[93m'
BOLD='\033[1m\033[1m'
UL='\033[4m'
NC='\033[0m' # No Color
printf "============================================================\n"
if test $# -eq 0
then
    printf "${BOLD}${UL}${RED} ERROR - ${NC}${BOLD}${STRONG_YELLOW}Please pass-in an ideal name${NC}"
    printf "${BOLD}${UL}${BLUE} NOTE - ${NC}${BOLD}${STRONG_YELLOW}Arguments are: ${NC}\n"
    printf "${BOLD}${UL}${BLUE} <ideal name> | --reboot | -r | --reboot-device | -R${NC}\n"
    printf "${BOLD}${UL}${BLUE} NOTE - ${NC}${BOLD}${STRONG_YELLOW}If no secondary argument is passed, script will not reboot the device - a manual reboot will be required${NC}\n"
    exit 1
fi
printf "============================================================\n"
echo $1
NAME=$1
echo $2
reboot_state=$2
echo $NAME
echo $reboot_state

echo $NAME | sudo tee  /etc/hostname

sudo sed -i -e 's/^.*hostname-setter.*$//g' /etc/hosts
printf "${STRONG_BLUE}127.0.0.1${NC}      " $NAME " ${STRONG_YELLOW}### Set by hostname-setter${NC}"  | sudo tee -a /etc/hosts

sudo service hostname.sh stop
sudo service hostname.sh start

printf "${BOLD}${STRONG_YELLOW}Hostname set.${NC}"
printf "${BOLD}${STRONG_YELLOW}You can use the command line to set the hostname at anytime using the following command:${NC}"
printf "${BOLD}${STRONG_BLUE}${UL}sudo hostname.sh <ideal hostname> <optional: --reboot | -r | --reboot-device | -R>${NC}"

case $2 in

--reboot | -r | --reboot-device | -R)
    printf "${BOLD}${UL}${RED} Warning - ${NC}${BOLD}${STRONG_YELLOW}Rebooting device in 15 seconds${NC}"
    sleep 15
    sudo reboot
    ;;

*)
    printf "${BOLD}${UL}${RED} Warning - ${NC}${BOLD}${STRONG_YELLOW}Device will not reboot after setup, please manually reboot when prompted or when setup completes${NC}"
    exit 1
    ;;
esac

printf "============================================================\n"