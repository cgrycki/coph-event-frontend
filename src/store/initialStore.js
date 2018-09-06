/**
 * Our application's initial store. Provides the shape of our applications data.
 * Each object holds a part of our application, and is combined during export.
 */


// Fields: Object holding our user data entered into HTML fields
const fields = {
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
  setup_mfk          : {
    FUND    : '',
    ORG     : '',
    DEPT    : '',
    SUBDEPT : '',
    GRANT   : '',
    INSTACCT: '',
    ORGACCT : '',
    DEPTACCT: '',
    FUNC    : '',
    COSTCNTR: ''
  },
  food_drink_required: false,
  food_provider      : '',
  alcohol_provider   : '',
  num_people         : 1
};


// Errors: Stores field level validation errors
const errors = {}


// Furniture: Stores user data added furniture
const furniture = {
  chairs_per_table  : 6,
  num_chairs        : 0,
  num_chair_racks   : 0,
  num_circles       : 0,
  num_circle_racks  : 0,
  num_rects         : 0,
  num_rect_racks    : 0,
  num_cocktails     : 0,
  num_cocktail_racks: 0,
  num_displays      : 0,
  num_trashs        : 0,
  items             : []
};

// Count: Get a count of furniture items
const count = {
  chairs_per_table  : 6,
  num_chairs        : 0,
  num_chair_racks   : 0,
  num_circles       : 0,
  num_circle_racks  : 0,
  num_rects         : 0,
  num_rect_racks    : 0,
  num_cocktails     : 0,
  num_cocktail_racks: 0,
  num_displays      : 0,
  num_trashs        : 0
};

// Hold our current furniture items
const items = [];

// IDs: ID Counters to increment when user creates furniture
const ids = {
  chair   : 0,
  rack    : 0,
  display : 0,
  circle  : 0,
  rect    : 0,
  cocktail: 0,
  trash   : 0
};


// Layout: Stores editor UI configuration data
const layout = {
  furn_type    : 'circle',
  selected_item: null,
  wh           : [960, 540],
  xy           : [0, 0],
  scaleXY      : [1, 1],
  offsetXY     : [0, 0]
};


// Application: Stores application data about our user's session
const app = {
  logged_in     : false,
  login_loading: false,
  login_error  : null,
  user_email   : '',
  is_admin     : false
};


// Rooms: Stores our API room data
const rooms = {
  rooms           : [],
  rooms_loading   : false,
  room_error      : null
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
  items        : [],
  events       : [],
  event_loading: false,
  event_error  : null,
  should_fetch : true
};



// Initial Store: Stores our application
const initialStore = {
  app,
  diagram: {
    items,
    ids,
    count,
    layout
  },
  form: {
    fields,
    errors,
    form_loading: false,
    form_error  : null,
    form_success: false
  },
  rooms,
  events
};
export default initialStore;