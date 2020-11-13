import React, { useEffect, useState } from "react";
import { getAllUserNotificationsListener } from "../API/Notification";
import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import NotificationItem from "../Components/NotificationItem";
import "../Styles/NotificationsPage.css";

export default function NotificationsPage() {
  const [allNotificationsTemp, setAllNotificationsTemp] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  const currentUser = useSelector((state) => state.currentUser);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  var dates = {
    convert: function (d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp)
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return d.constructor === Date
        ? d
        : d.constructor === Array
        ? new Date(d[0], d[1], d[2])
        : d.constructor === Number
        ? new Date(d)
        : d.constructor === String
        ? new Date(d)
        : typeof d === "object"
        ? new Date(d.year, d.month, d.date)
        : NaN;
    },
    compare: function (a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((a = this.convert(a).valueOf())) &&
        isFinite((b = this.convert(b).valueOf()))
        ? (a > b) - (a < b)
        : NaN;
    },
    inRange: function (d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((d = this.convert(d).valueOf())) &&
        isFinite((start = this.convert(start).valueOf())) &&
        isFinite((end = this.convert(end).valueOf()))
        ? start <= d && d <= end
        : NaN;
    },
  };

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      /*getAllUserNotifications(currentUser.username).then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
        var noti;
        for (noti of temp) {
          noti[1].dateCreated = noti[1].dateCreated.toDate();
        }
        setAllNotifications(
          temp.sort((n1, n2) => {
            return dates.compare(n2[1].dateCreated, n1[1].dateCreated);
          })
        );
      });*/
      setAllNotificationsTemp([]);
      const unsubscribe = getAllUserNotificationsListener(
        setAllNotificationsTemp,
        currentUser.username
      );

      const test = () => {
        return unsubscribe();
      };
      return test;
    }
  }, [currentUser]);

  useEffect(() => {
    setAllNotifications(
      allNotificationsTemp.sort((n1, n2) => {
        return dates.compare(n2[1].dateCreated, n1[1].dateCreated);
      })
    );
  }, [allNotificationsTemp]);

  return (
    <div className="NotificationsPage">
      <h1>Notifications</h1>
      {allNotifications && allNotifications.length > 0 ? (
        <Box display="flex" flexDirection="column">
          {allNotifications.map((data) => (
            <NotificationItem key={data[0]} notification={data[1]} />
          ))}
        </Box>
      ) : (
        <p>No notifications!</p>
      )}
    </div>
  );
}
