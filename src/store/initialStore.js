/*
 * Initial State
 */

export const initialState = {
  // Holds our form data, including selected furniture type (toolbar)
  forms: {
    eventName: '',
    eventDate: '',
    eventTime: '08:00',
    chairsPerTable: 6,
    eventComments: '',
    userEmail: ''
  },
  // Keep a only-incremental counter to uniquely name our canvas elements.
  furn_ids: {
    circle: 0,
    rect: 0,
    bar: 0,
    poster: 0,
    trash: 0
  },
  // Hold the furniture items in a quick lookup
  furn_items: {
    circle: [],
    rect: [],
    bar: [],
    poster: [],
    trash: []
  },
  // Keep track of our drag and drop editor.
  editor: {
    width: 500,
    height: 500,
    xy: [0, 0],
    scaleXY: [1, 1],
    offsetXY: [0, 0],
    selectedFurn: 'circle', // Furniture type to add on click
    focusedFurn: null,      // Selected furniture in editor, for transforms
    canvasRef: null,        // Our Konva stage reference
    URI: ''                 // Our canvas snapshot
  },
  // The numbers important for event coordinators.
  calculated: {
    numChairs: 0,
    numChairCarts: 0,
    numCircleCarts: 0,
    numRectCarts: 0,
    numBarCarts: 0,
    numPosters: 0,
    numTrashs: 0
  }
}

export const optimizedState = {
  // Holds our FormPanel data.
  forms: {
    // Used to store user inputs.
    fields: {
      eventName    : '',
      eventDate    : '',
      eventTime    : '08:00',
      eventComments: '',
      userEmail    : ''
    },
    // Used to store errors
    validations: {},
  },

  // Holds our Drag and Drop editor, stores virtual and computed data
  editor: {
    // Crucial, triggers computing calculated<{}> and items size
    circlesPerChair: 6,
    // Furniture type to be added
    selectedFurnType: '',
    // *SPECIFIC* item_id of furniture 
    focusedFurnId: '',
    // Canvas dataURI
    URI: '',

    // For our Konva.js canvas element
    canvas_props: {
      wh      : [500, 500],
      xy      : [0, 0],
      scaleXY : [1, 1],
      offsetXY: [0, 0],
    },
    // Counter state for unique IDs
    furn_ids: {
      circle: 0,
      rect  : 0,
      bar   : 0,
      poster: 0,
      trash : 0
    },
    // Objects to be mapped as canvas elements
    furn_items: {
      circle: [],
      rect  : [],
      bar   : [],
      poster: [],
      trash : []
    },
    // Computed variables for heads up display
    calculated: {
      numChairs     : 0,
      numChairCarts : 0,
      numCircleCarts: 0,
      numRectCarts  : 0,
      numBarCarts   : 0,
      numPosters    : 0,
      numTrashs     : 0
    }
  }
}