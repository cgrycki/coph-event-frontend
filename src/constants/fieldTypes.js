/* Field Types - Store our Form Fields as an array for easy rendering. */

const fieldTypes = [
  {
    id         : 'eventName',
    label      : 'Name',
    type       : 'text',
    placeholder: 'Health Careers Fair',
    required   : true,
  },
  {
    id         : 'eventDate',
    label      : 'Date',
    type       : 'date',
    placeholder: '2018-03-01',
    min        : '2018-01-01',
    max        : '2020-01-01',
    required   : true
  },
  {
    id         : 'eventTime',
    label      : 'Time',
    type       : 'time',
    placeholder: '08:00',
    min        : '08:00',
    max        : '18:00',
    required   : true
  },
  {
    id         : 'eventComments',
    label      : 'Comments',
    type       : 'textarea',
    placeholder: 'Enter instructions or requests.',
    maxlength  : "3000"
  },
  {
    id         : 'userEmail',
    label      : 'Contact Email',
    type       : 'email',
    placeholder: 'jane-doe@uiowa.edu',
    required   : true
  }
]

export default fieldTypes