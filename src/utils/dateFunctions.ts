import moment from "moment";

/**
 * Format a time or date string/object using moment.
 * Default format: HH:mm (24-hour style compatible with TimePicker)
 */
export const formatTime = (time: any, format = "HH:mm") => {
  if (!time) return "";
  return moment(time).format(format);
};

/**
 * Convert a time string to a moment object.
 * Useful for Ant Design TimePicker value parsing.
 */
export const parseTime = (timeString: string, format = "HH:mm") => {
  if (!timeString) return null;
  return moment(timeString, format);
};

/**
 * Standard date formatter
 */
export const formatDate = (date: any, format = "DD-MM-YYYY") => {
  if (!date) return "";
  return moment(date).format(format);
};

/**
 * Get current time in HH:mm format
 */
export const getCurrentTime = () => {
  return moment().format("HH:mm");
};
