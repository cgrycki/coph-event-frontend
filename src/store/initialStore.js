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
    circle: {},
    rect: {},
    bar: {},
    poster: {},
    trash: {}
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