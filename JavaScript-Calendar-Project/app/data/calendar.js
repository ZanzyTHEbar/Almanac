"use strict";

class Calendar {
  constructor(year, month, day, events = []) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.events = events;
  }
  getYear() {
    return this.year;
  }
  getMonth() {
    return this.month;
  }
  getDay() {
    return this.day;
  }
  getEvents() {
    return this.events;
  }
  setYear(year) {
    this.year = year;
  }
  setMonth(month) {
    this.month = month;
  }
  setDay(day) {
    this.day = day;
  }
  setEvents(events) {
    this.events = events;
  }
  addEvent(event) {
    this.events.push(event);
  }
  removeEvent(event) {
    this.events.splice(this.events.indexOf(event), 1);
  }
  getEvent(event) {
    return this.events[this.events.indexOf(event)];
  }
  getEventByName(name) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getName() == name) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDate(date) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getDate() == date) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByTime(time) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getTime() == time) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByLocation(location) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getLocation() == location) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDescription(description) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getDescription() == description) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndDate(name, date) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getDate() == date
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndTime(name, time) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getTime() == time
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndLocation(name, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndDescription(name, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDateAndTime(date, time) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getDate() == date &&
        this.events[i].getTime() == time
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDateAndLocation(date, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getDate() == date &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDateAndDescription(date, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getDate() == date &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByTimeAndLocation(time, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getTime() == time &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByTimeAndDescription(time, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getTime() == time &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByLocationAndDescription(location, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getLocation() == location &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndDateAndTime(name, date, time) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getDate() == date &&
        this.events[i].getTime() == time
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndDateAndLocation(name, date, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getDate() == date &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndDateAndDescription(name, date, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getDate() == date &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndTimeAndLocation(name, time, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getTime() == time &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndTimeAndDescription(name, time, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getTime() == time &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByNameAndLocationAndDescription(name, location, description) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getName() == name &&
        this.events[i].getLocation() == location &&
        this.events[i].getDescription() == description
      ) {
        return this.events[i];
      }
    }
    return null;
  }
  getEventByDateAndTimeAndLocation(date, time, location) {
    for (let i = 0; i < this.events.length; i++) {
      if (
        this.events[i].getDate() == date &&
        this.events[i].getTime() == time &&
        this.events[i].getLocation() == location
      ) {
        return this.events[i];
      }
    }
    return null;
  }
}

module.exports = Calendar;
