import { authStore } from "../stores/auth.store";
import moment from "moment-timezone";

const addTimeZone = (date, timezone) => {
  if (timezone) {
    return moment
      .tz(moment(date).format("YYYY-MM-DD HH:mm:ss"), timezone)
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    return moment
      .tz(
        moment(date).format("YYYY-MM-DD HH:mm:ss"),
        authStore.user.company.timeZone
      )
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
  }
};

export { addTimeZone };
