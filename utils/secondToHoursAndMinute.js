import {t} from "i18next"
import moment from "moment";

export const secondToHoursAndMinute = (seconds) => {
  switch (seconds) {
    case "Infinity":
      return "--:--";
    case undefined:
      return "--:--";
    case null:
      return "--:--";
    case NaN:
      return "--:--";
    case 0:
      return "--:--";
    default:
      const hour = Math.floor(seconds / 3600);
      const minute = Math.floor((seconds % 3600) / 60);
      return `${hour}:${minute} ${t("product:hours")}`;
  }
};


export const formatSeconds = (seconds) => {
  switch (seconds) {
    case "Infinity":
      return "--:--";
    case undefined:
      return "--:--";
    case null:
      return "--:--";
    case NaN:
      return "--:--";
    case 0:
      return "--:--";
    case "0":
      return "--:--";
    default:
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds} ${t("product:min")}`;
  }
};


export const legacyFormatSeconds = (seconds) => {
  switch (seconds) {
    case "Infinity":
      return "--:--";
    case undefined:
      return "--:--";
    case null:
      return "--:--";
    case NaN:
      return "--:--";
    case 0:
      return "--:--";
    case "0":
      return "--:--";
    default:
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
  }
};


export const secondToDay = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);

  return `${days}g ${hours}s`;
};

export const secondToHoursAndMinute2 = (start, end) => {
  const diff = moment(end).diff(moment(start), "seconds");

  const hour = Math.floor(diff / 3600);
  const minute = Math.floor((diff % 3600) / 60);
  return `${hour}:${minute} ${t("product:hours")}`;
};

export const legacySecondToDay = (seconds) => {
  const days = Math.floor(seconds / (86400));

  return `${days}`;
};


export default { secondToHoursAndMinute, formatSeconds,legacyFormatSeconds, secondToDay ,legacySecondToDay ,secondToHoursAndMinute2};
