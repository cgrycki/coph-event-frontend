/**
 * Our application's initial store. Provides the shape of our applications data.
 * Each object holds a part of our application, and is combined during export.
 */


// Fields: Object holding our user data entered into HTML fields
const info = {
  package_id         : null,
  user_email         : '',
  contact_email      : '',
  coph_email         : '',
  event_name         : '',
  comments           : '',
  date               : '',
  start_time         : '',
  end_time           : '',
  room_number        : '',
  references_course  : false,
  referenced_course  : '',
  setup_required     : false,
  setup_mfk          : '',
  food_drink_required: false,
  food_provider      : '',
  alcohol_provider   : '',
  num_people         : 1
};


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
};


// IDs: ID Counters to increment when user creates furniture
const ids = {
  chairs    : 0,
  racks     : 0,
  displays  : 0,
  circles   : 0,
  rects     : 0,
  cocktails : 0,
  num_trashs: 0
};


// Layout: Stores editor UI configuration data
const layout = {
  furn_type    : 'circle',
  selected_item: null,
  wh           : [500, 500],
  xy           : [0, 0],
  scaleXY      : [1, 1],
  offsetXY     : [0, 0]
};


// Application: Stores application data about our user's session
const app = {
  loggedIn     : false,
  login_loading: false,
  login_error  : null,
  user_email   : '',
  is_admin      : false
};


// Rooms: Stores our API room data
const rooms = {
  rooms        : [],
  rooms_loading: false,
  room_error   : null,

  room_schedule   : [],
  schedule_loading: false,
  schedule_error  : null,

  courses       : [],
  course_loading: false,
  course_error  : null
};


// Events: Stores event(s) data. Singular for users and list for admins
const events = {
  event: {},
  permissions: {
    canEdit         : false,
    canInitiatorVoid: false,
    canVoid         : false,
    canVoidAfter    : false,
    canSign         : false,
    signatureId     : null
  },
  events: [],
  event_loading: false,
  event_error: null
};



// Initial Store: Stores our application
const initialStore = {
  app,
  editor: {
    layout,
    furniture,
    ids
  },
  fields: {
    info,
    errors,
    form_loading: false,
    form_error  : null,
    form_success: false
  },
  rooms,
  events
};
export default initialStore;