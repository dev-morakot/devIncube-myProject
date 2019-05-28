import React, { Component } from 'react';
import _ from 'lodash';

export const DateHelper = dateString => {
    let today = new Date(dateString);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
}


export const TimeHelper = dateString => {
    let today = new Date(dateString);
    let hh = today.getHours();
    let mm = today.getMinutes();
    return hh + ":" + mm;
  };
  
export const validateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
};

export const numberWithCommas = num => {
    if (_.isUndefined(num) || _.isNull(num) || "" === num) {
      num = 0;
    } else {
      num = parseInt(num);
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
  
export const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
};

const monthFull = month => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "-";
    }
  };
  
export const formatDate = (date, format) => {
    if (!_.isUndefined(date) && !_.isNull(date) && "null" !== date) {
      let d = date.toString().split("-"),
        month = d[1],
        year = d[0];
      let dd = d[2].split(" "),
        day = dd[0];
      if (_.isUndefined(format)) {
        return [day, monthFull(month), year].join(" ");
      } else {
        return [day, month, year].join("/");
      }
    } else {
      return "";
    }
};
  
export const formatDateTime = (date, format) => {
    if (!_.isUndefined(date) && !_.isNull(date) && "null" !== date) {
      let d = date.toString().split("-"),
        month = d[1],
        year = d[0];
      let dd = d[2].split(" "),
        day = dd[0],
        strTime = dd[1];
      if (_.isUndefined(format)) {
        return [day, monthFull(month), year].join(" ") + " " + strTime;
      } else {
        return [day, month, year].join("/") + " " + strTime;
      }
    } else {
      return "";
    }
};
  
 
  
export const uploadImageValidate = (type, size) => {
    if (type.search("image/") >= 0) {
      let s = size.split(" ");
      if (s.length > 1) {
        if (parseInt(s[0]) <= 2048) {
          return true;
        }
      }
    } else {
      return false;
    }
};
  
export const uploadFileValidate = (type, size) => {
    console.log(size);
    let s = size.split(" ");
    if (s.length > 1) {
      if (parseInt(s[0]) <= 2048) {
        return true;
      }
    } else {
      return false;
    }
};