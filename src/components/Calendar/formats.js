/**
 * Formats: Calendar formatting
 */
import moment from 'moment';

const formats = {
  // Controls week day format in month view
  weekdayFormat: "dddd",

  // Time format for day/agenda view: 7:00 PM => 7p
  timeGutterFormat: (date, culture, localizer) => {
    const hr = ((moment(date).hour()) > 12) ? 
      moment(date).hour() - 12 : moment(date).hour();
    const AMPM = moment(date).format('a').slice(0, 1);

    return `${hr}${AMPM}`;
  },

  // Week header: 'July 29 - August 4, 2018'
  dayRangeHeaderFormat: ({ start, end }) => {
    // Format start
    const startYear      = moment(start).format("YYYY");
    const endYear        = moment(end).format("YYYY");
    const startFormatter = (startYear === endYear) ? "MMMM D" : "MMMM D YYYY";

    // Format end
    const startMonth   = moment(start).format("MMMM");
    const endMonth     = moment(end).format("MMMM");
    const endFormatter = (startMonth === endMonth) ? "D YYYY" : "MMMM D YYYY";

    // Format range
    const startFormatted = moment(start).format(startFormatter);
    const endFormatted   = moment(end).format(endFormatter);
    return `${startFormatted}-${endFormatted}`;
  },

  // Day view header: 'Saturday, December 23, 2018'
  dayHeaderFormat: "dddd, MMMM D, YYYY"
}


export default formats;