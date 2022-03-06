#!/bin/sh

echo "Hostname Setter Service Creator Started"
sudo mv hostname.sh /usr/bin/hostname.sh
echo "Moved hostname.sh to /usr/bin"
sudo chmod +x /usr/bin/hostname.sh
echo "Applied permissions to hostname.sh"

echo "Creating service file"
sudo touch /etc/systemd/system/hostname.service
sudo cat service.txt > /etc/systemd/system/hostname.service
echo "Created service file"

cat /etc/systemd/system/hostname.service

sudo systemctl daemon-reload
echo "Reloaded systemd"
sudo systemctl enable hostname.service
echo "Enabled hostname.sh"
sudo systemctl start hostname.service
echo "Hostname Setter Service Created"

echo "Changing Hostname"
sudo hostname.sh picalendar
echo "Hostname Changed to:"
hostname