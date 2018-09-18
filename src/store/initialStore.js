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



const diagram = {
  items: [],
  // IDs: ID Counters to increment when user creates furniture
  ids: {
    chair   : 0,
    rack    : 0,
    display : 0,
    circle  : 0,
    rect    : 0,
    cocktail: 0,
    trash   : 0
  },
  // Counts: keep track of furniture items for IT
  counts: {
    chair         : 0,
    chair_racks   : 0,
    circle        : 0,
    circle_racks  : 0,
    rect          : 0,
    rect_racks    : 0,
    cocktail      : 0,
    cocktail_racks: 0,
    display       : 0,
    trash         : 0
  },
  // Layout: Stores editor UI configuration data
  layout: {
    chairs_per_table: 6,
    furn_type       : 'circle',
    selected_item   : null,
    width           : 960,
    height          : 750,
    x               : 0,
    y               : 0,
    scaleX          : 1,
    scaleY          : 1
  },
  // Default layouts from our 'Layouts' DynamoDB table
  pub_layouts    : [],
  layouts_loading: false,
  layouts_error  : null
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


// Schedules: Stores room events from MAUI + Astra 
const schedules = {
  schedules       : [],
  schedule_loading: false,
  schedule_error  : null
};


// Events: Stores event(s) data. Singular for users and list for admins
const events = {
  current: {
    event: {},
    layout: {
      items: [],
      chairs_per_table: 6
    },
    permissions: {
      canEdit         : false,
      canInitiatorVoid: false,
      canVoid         : false,
      canVoidAfter    : false,
      canSign         : false,
      signatureId     : null
    }
  },
  events       : [],
  event_loading: false,
  event_error  : null,
  should_fetch : true
};



// Initial Store: Stores our application
const initialStore = {
  app,
  diagram,
  form: {
    fields,
    errors,
    form_loading: false,
    form_error  : null,
    form_success: false
  },
  rooms,
  schedules,
  events
};
export default initialStore;