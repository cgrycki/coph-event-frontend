import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
