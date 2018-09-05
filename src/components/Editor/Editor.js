// Dependencies
import React  from 'react';

// Components
import GUI    from './GUI';
import ZoomSlider from './Surfaces/ZoomSlider';

// Assets
import './assets/Editor.css';


// React Component
const Editor = () => (
  <div className="ms-borderBase">
    <div className="ms-Grid-row">
      <GUI />
      <ZoomSlider />
    </div>
  </div>
);

export default Editor;
