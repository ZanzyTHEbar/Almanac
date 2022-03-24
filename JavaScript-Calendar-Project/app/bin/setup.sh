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

printf "Hostname Setter Service Creator Started\n"
sudo cp hostname.sh /usr/bin/hostname.sh
printf "Moved hostname.sh to /usr/bin\n"
sudo chmod +x /usr/bin/hostname.sh
printf "Applied permissions to hostname.sh\n"

printf "Creating service file\n"
sudo touch /etc/systemd/system/hostname.service
sudo cat .service.txt > /etc/systemd/system/hostname.service
printf "Created service file\n"

cat /etc/systemd/system/hostname.service

sudo systemctl daemon-reload
printf "Reloaded systemd\n"
sudo systemctl enable hostname.service
printf "Enabled hostname.sh\n"
sudo systemctl start hostname.service
printf "Hostname Setter Service Created\n"

printf "Changing Hostname\n"
sudo hostname.sh picalendar
printf "Hostname Changed to:"
hostname
printf "This is the default hostname, feel free to change it to whatever you want\n"