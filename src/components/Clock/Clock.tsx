import React, { useEffect } from "react";
import "./Clock.scss";

const Clock: React.FC = () => {
  useEffect(() => {
    const hours = document.querySelector(".hours");
    const minutes = document.querySelector(".minutes");
    const seconds = document.querySelector(".seconds");

    const month = document.querySelector(".month");
    const day = document.querySelector(".day");
    const year = document.querySelector(".year");

    function setDate() {
      const now = new Date();
      const mm = now.getMonth();
      const dd = now.getDate();
      const yyyy = now.getFullYear();
      const secs = now.getSeconds();
      const mins = now.getMinutes();
      const hrs = now.getHours();
      const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      if (hrs > 12) {
        // @ts-ignore
        hours.innerHTML = hrs - 12;
      } else {
        // @ts-ignore
        hours.innerHTML = hrs;
      }

      if (secs < 10) {
        // @ts-ignore
        seconds.innerHTML = "0" + secs;
      } else {
        // @ts-ignore
        seconds.innerHTML = secs;
      }

      if (mins < 10) {
        // @ts-ignore
        minutes.innerHTML = "0" + mins;
      } else {
        // @ts-ignore
        minutes.innerHTML = mins;
      }

      //   @ts-ignore
      month.innerHTML = monthName[mm];
      //   @ts-ignore
      day.innerHTML = dd;
      //   @ts-ignore
      year.innerHTML = yyyy;
    }

    setInterval(setDate, 1000);
  }, []);

  return (
    <div>
      <div className="alarm-clock">
        <div className="date">
          <span className="day" /> - <span className="month" /> -{" "}
          <span className="year" />
        </div>
        <div className="time">
          <span className="hours" />
          <span className="colon">:</span>
          <span className="minutes" />
          <span className="colon">:</span>
          <span className="seconds" />
        </div>
      </div>
    </div>
  );
};

export default Clock;
