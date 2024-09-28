import moment from "moment-timezone";
import { useEffect, useState } from "react";

const format = "YYYY-MM-DD HH:mm:ss.SSS";
function useTimeZone() {
  const [timeZoneDefault, setTimeZoneDefault] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = JSON.parse(localStorage.getItem("AuthStore"));
      setTimeZoneDefault(items?.user?.company?.timeZone || null);
    }
  }, []);

  return timeZoneDefault;
}

function timeFormatter(utcTime, targetTimezone) {
  const momentUtcTime = moment.utc(utcTime);
  let convertedTime;

  const timeZoneDefault = useTimeZone();

  if (targetTimezone) {
    convertedTime = momentUtcTime.tz(targetTimezone);
  } else if (timeZoneDefault) {
    convertedTime = momentUtcTime.tz(timeZoneDefault);
  }

  if (convertedTime) {
    return {
      unix: convertedTime.unix(),
      formatted: convertedTime.format(format),
    };
  } else {
    return null;
  }
}

export { timeFormatter, useTimeZone };
