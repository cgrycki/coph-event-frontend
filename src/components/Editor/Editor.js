// Dependencies
import React  from 'react';

// Components
import GUI    from './GUI';

// Assets
import './assets/Editor.css';


// React Component
export default class Editor extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="ms-borderBase">
        <GUI/>
        
      </div>
    );
  }
}