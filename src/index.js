import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// reducer
import reducers from './reducers';
// actions

import App from './components/app.component';
import registerServiceWorker from './registerServiceWorker';

// create store
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch({type: 'UPD_FORM', name: 'eventName', value: 'test name'});
//store.dispatch({type: 'UPD_FORM', name: 'chairsPerTable', value: '8'});

store.dispatch({
  type: 'ADD_FURN_ITEM', 
  furn_type: 'circle',
  x: 50,
  y: 50
});
store.dispatch({
  type: 'UPD_FURN_ITEM',
  item_id: 'circle0',
  furn_type: 'circle',
  x: 150,
  y: 150
});

store.dispatch({
  type: 'ADD_FURN_ITEM', 
  furn_type: 'circle',
  x: 0,
  y: 0
});

store.dispatch({
  type: 'ADD_FURN_ITEM', 
  furn_type: 'circle',
  x: Math.random() * 100,
  y: Math.random() * 100
});

store.dispatch({
  type: 'RM_FURN_ITEM',
  furn_type: 'circle',
  item_id: 'circle1'
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();