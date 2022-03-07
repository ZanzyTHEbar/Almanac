# Microsoft Calendar Epaper Display

[![GitHub issues](https://img.shields.io/github/issues/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/issues) [![GitHub forks](https://img.shields.io/github/forks/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/network) [![GitHub stars](https://img.shields.io/github/stars/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/stargazers) [![GitHub license](https://img.shields.io/github/license/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/blob/main/LICENSE)

## 📅 Microsoft Calendar E-paper Display 🗓️

This repo is dedicated to the **Microsoft Calendar E-paper Display**, an automated system for displaying a user(s) work/personal calendar events onto an e-paper-like display.

## WHAT IS THIS PROJECT

This project is dedicated to designing a sleek and platform agnostic locally hosted webserver for displaying, interacting, and syncing data across Microsoft services. With the intention of user-friendly and minimalistic.

Through the power of web-magic the PiSugar2's web interface is grabbed by this Node.js app and presented to the user via the settings page. The onboard RTC can be set to wake and trigger the RPi to boot up daily at a time of your preference, or using _presence_ _detection_. Upon boot, the Node.JS server fetches calendar events from the Microsoft Graph API through a user controllable filter, and then formats them into the desired layout before displaying it on the e-paper display. The RPi then shuts down to conserve battery. The calendar remains displayed on the e-paper screen.

### Some features of the calendar

Battery life is definitely a concern, but not a huge issue for me personally. The [dev](https://github.com/speedyg0nz) over at [MagikCal](https://github.com/speedyg0nz/MagInkCal) was getting around 3-4 weeks before needing to recharge the PiSugar2.

With the addition of RTC and presence detection, i am not too concerned about this. However, if you are, please go into the UI settings and disable these features.

With E-Ink/E-Paper displays of the tri-colour variety you have the luxury of using red, I used it to highlight the current date, as well as recently added/updated events. However, if you are using a multicolor display or an LCD panel, you can have a full-colour experience, without the added feature of the display containing content when powered off. This is why i implemented presence detection, and deep-sleep modes. I highly recommend you enable these features if using a full-colour display.

Given the limited space and resolution on e-paper displays, One can only show 3 events per day and an indicator (e.g. 4 more) for those not displayed. If an e-paper display is chosen, the calendar will always start from the current week, and display the next four (total 35 days). If the dates for an event cross over to the new month, that event is displayed in grey instead of black.

I thought it was a pretty neat idea to bring the project full-circle with the calendar imagery. So, i implemented the ability to grab photos from your Microsoft One Drive as well as a DLNA Media server. Both of these features can be turned off, however they are pretty nice. Best experienced on a full-colour display.

![Software GUI]()

![Example Cross Over Dates]()

![Themes]()

![DLNA Service]()

## Setup ✔️

In order to properly run this server, you will need to have a NodeJS install and a Microsoft account. If you do not have one, you can [sign up for one](https://login.microsoftonline.com/). You will need to be an admin of the account, and have access to the Microsoft Graph API. You can find this on the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/concepts/overview).

The following steps will guide you through the setup of this project.

To install NodeJS for the Raspberrypi Zero W please follow the steps below, each Pi will have slightly different steps. I have used a Zero WH in this build, so those are the steps listed. 

Firstly, copy this command and run as sudo:

        curl -o node-v11.9.0-linux-armv6l.tar.gz https://nodejs.org/dist/v11.9.0/node-v11.9.0-linux-armv6l.tar.gz

Wait until that is complete, then run this command:

        tar -xzf node-v11.9.0-linux-armv6l.tar.gz

Finally we copy these files to the correct directory:

        sudo cp -r node-v11.9.0-linux-armv6l/* /usr/local/

Now we can remove the extra files:

        sudo rm -rf node-v11.9.0-linux-armv6l.tar.gz node-v11.9.0-linux-armv6l

You can test the installation with:

        node -v
        npm -v

There you go 😁 NPM and NodeJS are successfully installed. Onto the next.

Install GIT:

        sudo apt-get install git

Then update the pi:

        sudo apt-get update -y && sudo apt-get upgrade -y

Clone this repo to `/home/<your username>/` directory and **DO NOT** clone this repo into a nested folder, clone it directly to the user directory. The project already exists inside of a nested directory.

Now clone this repo:

        git clone https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display.git

Alright! Doing great 🤗

Go to the Azure Admin Portal and create a new app. This will be the app you will use to access the Microsoft Graph API.

If you do not know how to do this, please refer to the [Microsoft Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps). You will need to create a new app, and then grant access to the Microsoft Graph API, which i will explain in the next step.

Navigate to the `app` directory of this project `JavaScript-Calendar-Project/App`. This will be the directory where you will be running the Node.js app and creating your `/env` file. You will need to have `nodejs` and `npm` installed onto your system. If you do not know how to do this, please refer to the [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) documentation. If you wish to use the Azure storage features, you will also need to have the `azure-storage` and `azure-storage-blob` modules installed, however these are optional. If you do not know how to do this, please refer to the [Azure Storage](https://azure.microsoft.com/en-us/services/storage/) and [Azure Storage Blob](https://azure.microsoft.com/en-us/services/storage/blob-storage/) documentation.

While in the `app` directory, create an `.env` file. This will be the file that will contain your Microsoft Graph API credentials. You will need to create this file and then fill it with your Microsoft Graph API credentials. You can find this on the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/concepts/overview).

You will have to configure the `/.keys` folder to store your SSL data. This is where the Node.js app will store the private key and certificate. You will need to generate these files and place them here.

You will have to configure the `/bin/www` file to point to the correct file key and certs. The default names of the files is `client-key.pem` and `client-cert.pem`. The default port is `4443`.

Your Microsoft Graph API credentials

        OAUTH_CLIENT_ID=<your client id>
        OAUTH_CLIENT_SECRET='<your client secret>'
        OAUTH_REDIRECT_URI=http://localhost:4443/auth/callback
        OAUTH_SCOPES='user.read,calendars.readwrite,mailboxsettings.read'
        OAUTH_AUTHORITY=https://login.microsoftonline.com/common/

OPTIONAL: Not required for this project, but if you want to use Azure Media Services, you will need to create a storage account and configure the following

        #Azure Storage credentials
        AZURE_STORAGE_ACCOUNT=<your storage account name>
        AZURE_STORAGE_ACCESS_KEY=<your storage account access key>

OPTIONAL: Not required for this project, but if you want to use DLNA Media Server, you will need to create a storage account and configure the following

        #DLNA Media Server credentials
        DLNA_MEDIA_SERVER_HOST=<your DLNA Media Server host>
        DLNA_MEDIA_SERVER_PORT=<your DLNA Media Server port>
        DLNA_MEDIA_SERVER_USERNAME=<your DLNA Media Server username>
        DLNA_MEDIA_SERVER_PASSWORD=<your DLNA Media Server password>

Once you have created the `.env` file, you can run the following commands to setup and start the Node.js app.

Navigate to the app directory (this is where the `.env` file is located)

        cd /JavaScript-Calendar-Project/App

Install the Node.js modules

        sudo npm install

Then fix any vulnerabilities of the Node.js app

        sudo npm audit fix

Now let's configure the `raspi-config` file. This file will be used to configure the Raspberry Pi.

        sudo raspi-config

Edit the following settings

        Advanced Options > Advanced OverScan > Enable Compensation: No

        Boot options > Desktop/CLI: CLI

        Boot options > Console Autologin: Yes

Select `Finish` to save the changes. Select `Yes` to reboot the Pi. You should now be able to see the GUI upon boot via HDMI or the connected display.

Once the device boots backup, navigate to the bin directory

        cd /JavaScript-Calendar-Project/App/bin

Now we will setup the Server environment

        sudo python3 setup.py

The device will reboot automatically when setup is complete, and can be accessed afterwards via ssh using `pi@picalendar.local`.

The Node.js server will automatically start when the device boots.

However, to manually start the server navigate back to the app directory

        cd /JavaScript-Calendar-Project/App

The below command will start the Node.js app with the ability to quickly restart it using the `rs` command (great for development).

        sudo nodemon

or use the following command to start the server in the background

        sudo npm start

Now you are setup and ready to go. You can now access the app by going to `https://<your hostname.local>`. The default hostname is `picalendar`. If you want to change this, you can do so by running the following command.

        sudo hostname.sh <newhostname>

## Things to Do 📝

Below is a list of project goals, _completed_ goals are marked with a check.

### Hardware

- [ ] Any Server-cable Machine - Raspberrypi Zero WH preferred - Header pins are needed to connect to the E-Ink display
- [ ] Battery-Pack or permanent plugin point
- [ ] Integrate a BOM parts list
- [ ] Integrate SD Card
- [ ] Integrate speakers for audio feedback
- [ ] Preferred Waveshare 12.48" Tri-color E-Ink Display - Unfortunately out of stock at the time this is published (any display will work of course)
- [ ] PiSugar2 for Raspberry Pi Zero (Tindie) - Provides the RTC and battery for this project
- [ ] Implement option for Presence Detection via a choice of sensors or phone GPS
- [ ] Implement WakeOnLan

### Software

- [x] Implement proper Auth-Token management
- [ ] Implement proper error handling&logging
- [ ] Implement proper documentation
- [ ] Implement proper debugging for testing
- [ ] Add custom sounds for speakers
- [ ] Implement custom themes the user can choose from
- [ ] Implement theme changes based on weather outside
        -> Implement choice to change to opposite - ex: Hot outside show cool theme
- [ ] Implement weather display section
- [ ] Add radio button to enable/disable slideshow of calendar images
        -> Custom images from DLNA or One Driver server
        -> Stock photos from microsoft windows backgrounds
        -> stock images of seasons/places
- [ ] Implement NTP service to get Real-Time based on time-zone
- [ ] Implement option for Presence Detection via a choice of sensors or phone GPS
- [ ] Implement WakeOnLan
- [ ] Cronjob to update calendar images every day
- [ ] Cronjob to update

_Inspired by [InkyCal](https://github.com/aceisace/Inkycal) and [MagikCal](https://github.com/speedyg0nz/MagInkCal)._
