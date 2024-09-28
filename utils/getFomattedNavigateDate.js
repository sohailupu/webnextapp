import moment from "moment";

export const getFormattedNavigateDate = (startDate, dayStartHour) => {
  const start = moment(startDate).utcOffset(3);

  const dayStart = moment(dayStartHour, "HH:mm:ss");
  if (
    start.hour() < dayStart.hour() ||
    (start.hour() === dayStart.hour() && start.minute() < dayStart.minute()) ||
    (start.hour() === dayStart.hour() && start.minute() === dayStart.minute() && start.second() < dayStart.second())
  ) {
    start.subtract(1, "day");
  }

  const formattedDate = start.format("YYYY-MM-DD");
  return formattedDate;
};
