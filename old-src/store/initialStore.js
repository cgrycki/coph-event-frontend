/*
 * Initial State
 */

export const initialState = {
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
    saveStatus: 'SAVE_READY'
  },

  // Holds our Drag and Drop editor, stores virtual and computed data
  editor: {
    // Crucial, triggers computing calculated<{}> and items size
    chairsPerTable: 6,
    // Furniture type to be added
    selectedFurnType: 'circle',
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
    furn_items: [],
    
    // Computed variables for heads up display
    calculated: {
      numChairs     : 0,
      numChairCarts : 0,
      numCircles    : 0,
      numCircleCarts: 0,
      numRects      : 0,
      numRectCarts  : 0,
      numBars       : 0,
      numBarCarts   : 0,
      numPosters    : 0,
      numTrashs     : 0
    }
  }
}