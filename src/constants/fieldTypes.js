/**
 * fieldTypes.js
 * Holds dicts for our Field Labels
 */

export const field_labels = {
  user_email       : 'User Email',
  contact_email    : 'Contant Email',
  event_name       : 'Event Name',
  comments         : 'Event Comments',
  date             : 'Date',
  start_time       : 'Start Time',
  end_time         : 'End Time',
  room_number      : 'Room #',
  references_course: 'For a University course?',
  referenced_course: 'Course #',
  setup_required   : 'Setup required',
  setup_mfk        : 'MFK Provider',
  food_provider    : 'Food Provider',
  alcohol_provider : 'Alcohol Provider',
  num_people       : 'Expected Attendance'
};

export const review_fields = [
  'user_email',
  'contact_email',
  'comments',
  'date', 'start_time', 'end_time',
  'room_number',
  'referenced_course',
  'setup_required',
  'setup_mfk',
  'food_provider',
  'alcohol_provider',
  'num_people'
];

export const setup_mfk_fields = [
  {
    label: 'FUND',
    field: 'FUND',
    maxLength: 3,
    required: true
  },
  {
    label: 'ORG',
    field: 'ORG',
    maxLength: 2,
    required: true
  },
  {
    label: 'DEPT',
    field: 'DEPT',
    maxLength: 4,
    required: true
  },
  {
    label: 'SUB DEPT',
    field: 'SUBDEPT',
    maxLength: 5,
    required: false
  },
  {
    label: 'GRANT',
    field: 'GRANT',
    maxLength: 8,
    required: false
  },
  {
    label: 'INST ACCT',
    field: 'INSTACCT',
    maxLength: 4,
    required: true
  },
  {
    label: 'ORG ACCT',
    field: 'ORGACCT',
    maxLength: 3,
    required: false
  },
  {
    label: 'DEPT ACCT',
    field: 'DEPTACCT',
    maxLength: 5,
    required: false
  },
  {
    label: 'FUNC',
    field: 'FUNC',
    maxLength: 2,
    required: true
  },
  {
    label: 'COST CNTR',
    field: 'COSTCNTR',
    maxLength: 4,
    required: false
  }
];