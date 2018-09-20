/* Room Features, taken from Astra */
const features = [ 
  'Computer - Windows',
  'Disc Player - DVD',
  'Document Camera',
  'Dual Projection - 2 Images',
  'Lecture Capture with Mic',
  'Mic Drawer',
  'Microphone - Fixed on Podium',
  'Microphone - Wireless',
  'Podium',
  'Projection Screen - Fixed',
  'Projector - Data/Video',
  'Sound System',
  'Technology Control System',
  'Video Conferencing'
];

export default features;



/* Unique features
const rp = require('request-promise');

const options = {
  uri: 'https://dev.cphb-events.api.public-health.uiowa.edu/maui/rooms',
  method: 'GET',
  json: true
};

function combineFeatures(rooms) {
  rooms.forEach(rm => { if (!rm.hasOwnProperty('featureList')) console.log(rm); });

  const features = rooms.map(rm => rm.featureList);
  const flatFeatures = [].concat.apply([], features);
  const filterFeatures = new Set(flatFeatures);

  return Array.from(filterFeatures).sort();
}



rp.get(options)
  .then(data => console.log(combineFeatures(data)))
  .catch(err => console.log(err));
*/