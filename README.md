# Microsoft Calendar Epaper Display

[![GitHub issues](https://img.shields.io/github/issues/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/issues) [![GitHub forks](https://img.shields.io/github/forks/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/network) [![GitHub stars](https://img.shields.io/github/stars/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/stargazers) [![GitHub license](https://img.shields.io/github/license/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/blob/main/LICENSE)

## 📅 Microsoft Calendar E-paper Display 🗓️

This repo is dedicated to the **Microsoft Calendar E-paper Display**, an automated system for displaying a user(s) work/personal calendar events onto an e-paper-like display.

## WHAT IS THIS PROJECT

This project is dedicated to designing a sleek and platform agnostic locally hosted webserver for displaying, interacting, and syncing data across Microsoft services. With the intention of user-friendly and minimalistic.

Through the power of web-magic the PiSugar2's web interface is grabbed by this Node.js app and presented to the user via the settings page. The onboard RTC can be set to wake and trigger the RPi to boot up daily at a time of your preference, or using _presence_ _detection_. Upon boot, the Node.JS server fetches calendar events from the Microsoft Graph API through a user controllable filter, and then formats them into the desired layout before displaying it on the e-paper display. The RPi then shuts down to conserve battery. The calendar remains displayed on the e-paper screen.

### Some features of the calendar

Battery life is definitely a concern, but not a huge issue for me personally. The [dev](https://github.com/speedyg0nz) over at [MagikCal](https://github.com/speedyg0nz/MagInkCal) was getting around 3-4 weeks before needing to recharge the PiSugar2.

With the addition of WakeonLAN and presence detection, i am not too concerned about this. However, if you are, please go into the UI settings and disable these features.

With E-Ink/E-Paper displays of the tri-colour variety you have the luxury of using red, I used it to highlight the current date, as well as recently added/updated events. However, if you are using a multicolor display or an LCD panel, you can have a full-colour experience, without the added feature of the display containing content when powered off. This is why i implemented presence detection, and deep-sleep modes. I highly recommend you enable these features if using a full-colour display.

Given the limited space and resolution on e-paper displays, One can only show 3 events per day and an indicator (e.g. 4 more) for those not displayed. If an e-paper display is chosen, the calendar will always start from the current week, and display the next four (total 35 days). If the dates for an event cross over to the new month, that event is displayed in grey instead of black.

I thought it was a pretty neat idea to bring the project full-circle with the calendar imagery. So, i implemented the ability to grab photos from your Microsoft One Drive as well as a DLNA Media server. Both of these features can be turned off, however they are pretty nice. Best experienced on a full-colour display.

![Software GUI]()

![Example Cross Over Dates]()

![Themes]()

![DLNA Service]()

## Setup ✔️

In order to properly run this server, you will need to have a Microsoft account. If you do not have one, you can [sign up for one](https://login.microsoftonline.com/). You will need to be an admin of the account, and have access to the Microsoft Graph API. You can find this on the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/concepts/overview).

The following steps will guide you through the setup of this project.

Go to the Azure Admin Portal and create a new app. This will be the app you will use to access the Microsoft Graph API.

If you do not know how to do this, please refer to the [Microsoft Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps). You will need to create a new app, and then grant access to the Microsoft Graph API, which i will explain in the next step.

Clone this repo and navigate to the `app` directory. This will be the directory where you will be running the Node.js app and creating your `/env` file. You will need to have the `node` and `npm` installed on your system. If you do not know how to do this, please refer to the [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) documentation. You will also need to have the `azure-storage` and `azure-storage-blob` modules installed. If you do not know how to do this, please refer to the [Azure Storage](https://azure.microsoft.com/en-us/services/storage/) and [Azure Storage Blob](https://azure.microsoft.com/en-us/services/storage/blob-storage/) documentation.

While in the `app` directory, create a `.env` file. This will be the file that will contain your Microsoft Graph API credentials. You will need to create this file, and then fill it with your Microsoft Graph API credentials. You can find this on the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/concepts/overview).

                ```txt
                #Microsoft Graph API credentials
                OAUTH_CLIENT_ID=<your client id>
                OAUTH_CLIENT_SECRET='<your client secret>'
                OAUTH_REDIRECT_URI=http://localhost:8080/auth/callback
                OAUTH_SCOPES='user.read,calendars.readwrite,mailboxsettings.read'
                OAUTH_AUTHORITY=https://login.microsoftonline.com/common/
                ```
                ```txt
                #OPTIONAL: Not required for this project, but if you want to use Azure Media Services, you will need to create a storage account and configure the following
                #Azure Storage credentials
                AZURE_STORAGE_ACCOUNT=<your storage account name>
                AZURE_STORAGE_ACCESS_KEY=<your storage account access key>
                ```
                ```txt
                #OPTIONAL: Not required for this project, but if you want to use DLNA Media Server, you will need to create a storage account and configure the following
                #DLNA Media Server credentials
                DLNA_MEDIA_SERVER_HOST=<your DLNA Media Server host>
                DLNA_MEDIA_SERVER_PORT=<your DLNA Media Server port>
                DLNA_MEDIA_SERVER_USERNAME=<your DLNA Media Server username>
                DLNA_MEDIA_SERVER_PASSWORD=<your DLNA Media Server password>
                ```

Once you have created the `.env` file, you can run the following commands to start the Node.js app.

                ```txt
                cd app //navigate to the app directory (this is where the `.env` file is located)
                ```
                ```txt
                sudo npm install //install the Node.js modules
                ```
                ```txt
                cd bin //navigate to the bin directory
                ```
                ```txt
                python3 setup.py //setup the Server to have mDNS and a proper hostname
                ```
                ```txt
                cd .. //navigate back to the app directory
                ```
                ```txt
                sudo npm start //this will start the Node.js app
                ```

Now you are setup and ready to go. You can now access the app by going to `http://<your hostname.local>`. The default hostname is `picalendar`. If you want to change this, you can do so by running the following command.

                ```shell
                sudo hostname.sh <newhostname> //navigate to the hostname file
                ```

## Things to Do 📝

Below is a list of project goals, ***completed*** goals are marked with a check.

***Hardware***

- [ ] Any Server-cable Machine - Raspberrypi Zero WH preferred - Header pins are needed to connect to the E-Ink display
- [ ] Battery-Pack or permanent plugin point
- [ ] Integrate a BOM parts list
- [ ] Integrate SD Card
- [ ] Integrate speakers for audio feedback
- [ ] Preferred Waveshare 12.48" Tri-color E-Ink Display - Unfortunately out of stock at the time this is published (any display will work of course)
- [ ] PiSugar2 for Raspberry Pi Zero (Tindie) - Provides the RTC and battery for this project
- [ ] Implement option for Presence Detection via a choice of sensors or phone GPS
- [ ] Implement WakeOnLan

***Software***

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
