# Microsoft Calendar Epaper Display

[![GitHub issues](https://img.shields.io/github/issues/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/issues) [![GitHub forks](https://img.shields.io/github/forks/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/network) [![GitHub stars](https://img.shields.io/github/stars/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/stargazers) [![GitHub license](https://img.shields.io/github/license/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display?style=plastic)](https://github.com/ZanzyTHEbar/Microsoft_Calendar_Epaper_Display/blob/main/LICENSE)

# :pencil:

## 📅 Microsoft Calendar Epaper Display 🗓️

This repo is dedicated to the **Microsoft Calendar Epaper Display**, an automated system for displaying a user(s) work/personal calendar events onto an epaper-like display.

## WHAT IS THIS PROJECT

This project is dedicated to designing a sleak and platform agnostic locally hosted webserver for displaying, interacting, and syncing data across Microsoft services. With the intention of user-friendly and minimalistic.

![Example]()

![Themes]()

![Software GUI]()

![DLNA Service]()

## Things to Do

Below is a list of project goals, ***completed*** goals are marked with a check.

***Hardware***

- [ ] Any Server-cable Machine - Raspberrypi Zero WH preferred - Header pins are needed to connect to the E-Ink display
- [ ] Battery-Pack or permanent plugin point
- [ ] Integrate a BOM parts list
- [ ] Integrate SD Card
- [ ] Integrate speakers for audio feedback
- [ ] Preferred Waveshare 12.48" Tri-color E-Ink Display - Unfortunately out of stock at the time this is published (any display will work of course)
- [ ] PiSugar2 for Raspberry Pi Zero (Tindie) - Provides the RTC and battery for this project


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
        -> Custom images from DLNA server
        -> Stock photos from microsoft windows backgrounds
        -> stock images of seasons/places
- [ ] Implement NTP service to get Real-Time based on time-zone
        

_Inspired by [InkyCal](https://github.com/aceisace/Inkycal) and [MagikCal](https://github.com/speedyg0nz/MagInkCal)._
