/**
 * Our application's initial store. Provides the shape of our applications data.
 * Each object holds a part of our application, and is combined during export.
 */


// Fields: Object holding our user data entered into HTML fields
const fields = {
  user_email       : '',
  contact_email    : '',
  comments         : '',
  date             : '',
  start_time       : '',
  end_time         : '',
  room_number      : '',
  referenced_course: '',
  setup_required   : false,
  setup_mfk        : '',
  food_provider    : '',
  alcohol_provider : '',
  num_people       : 0
}


// Errors: Stores field level validation errors
const errors = {}


// Furniture: Stores user data added furniture
const furniture = {
  chairs_per_table : 6,
  num_chairs       : 0,
  num_racks        : 0,
  num_displays     : 0,
  num_circles      : 0,
  num_rects        : 0,
  num_cocktails    : 0,
  num_trashs       : 0,
  items            : []
}


// IDs: ID Counters to increment when user creates furniture
const ids = {
  chairs    : 0,
  racks     : 0,
  displays  : 0,
  circles   : 0,
  rects     : 0,
  cocktails : 0,
  num_trashs: 0
}


// Editor: Stores editor UI configuration data
const editor = {
  furn_type    : 'circle',
  selected_item: null,
  wh           : [500, 500],
  xy           : [0, 0],
  scaleXY      : [1, 1],
  offsetXY     : [0, 0]
}


// Application: Stores application data about our user's session
const app = {
  loggedIn    : false,
  step        : 0,
  save_status : 'NOT_READY',
  save_error  : null
}


// Rooms: Stores our API room data
const rooms = {
  rooms       : [],
  room_loading: false,
  room_error  : null
}


// Initial Store: Stores our application
export const initialStore = {
  app,
  editor,
  errors,
  ids,
  fields,
  furniture,
  rooms
};