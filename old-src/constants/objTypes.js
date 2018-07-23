/* Object types for our application.
  - Furniture types: used by our GUI and buttons.
  - Field types: form fields. Used by form and validator
  - Style types: exclusively Konva/GUI.
*/

/* Types of furniture we will deal with. */
export const furnitureTypes = [
  { value: 'circle',  label: 'Circle',    icon: '' },
  { value: 'rect',    label: 'Rectangle', icon: '' },
  { value: 'bar',     label: 'Bar',       icon: '' },
  { value: 'poster',  label: 'Posters',   icon: '' },
  { value: 'trash',   label: 'Trash Can', icon: '' }
];

/* Field Types - Store our Form Fields as an array for easy rendering. */
export const fieldTypes = [
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
];

/* Define the furniture item 'state' styles. */
export const styleTypes = {
  // Under cursor sprite
  unfocused: {
      fill       : '#c8c8c8',
      stroke     : '#666666',
      strokeWidth: 1,
      opacity    : 0.25
  },
  // Item placed in bounds, and not focused
  normal: {
      fill         : '#a6a6a6',
      stroke       : '#333333',
      strokeWidth  : 0.25,
      shadowColor  : 'black',
      shadowBlur   : 2,
      shadowOpacity: 0.1,
      shadowOffset : {x: 1, y: 1},
      opacity      : 1
  },
  // Item currently under user's selection
  focused: {
      fill         : '#0078d7',
      stroke       : '#333333',
      strokeWidth  : 0.5,
      shadowColor  : 'black',
      shadowBlur   : 3,
      shadowOpacity: 0.25,
      shadowOffset : {x: 2, y: 2},
      opacity      : 1
  },
  // Table is intersecting another table OR out of bounds.
  error: {
      fill  : '#fc9272',
      stroke: '#de2d26'
  }
};