import React from 'react';
import { 
  TextField,
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements as TabTypes
} from 'office-ui-fabric-react';



const row_style = {
  "marginLeft"    : "auto",
  "display"       : "flex",
  "justifyContent": "space-between",
  "alignItems"    : "flex-end"
};

const fields = [
  {
    label: 'FUND',
    field: 'FUND',
    maxLength: 3,
    required: true
  },
  {
    label: 'ORG',
    field: 'ORG',
    maxLength: 2,
    required: true
  },
  {
    label: 'DEPT',
    field: 'DEPT',
    maxLength: 4,
    required: true
  },
  {
    label: 'SUB DEPT',
    field: 'SUBDEPT',
    maxLength: 5,
    required: false
  },
  {
    label: 'GRANT',
    field: 'GRANT',
    maxLength: 8,
    required: false
  },
  {
    label: 'INST ACCT',
    field: 'INSTACCT',
    maxLength: 4,
    required: true
  },
  {
    label: 'ORG ACCT',
    field: 'ORGACCT',
    maxLength: 3,
    required: true
  },
  {
    label: 'DEPT ACCT',
    field: 'DEPTACCT',
    maxLength: 5,
    required: false
  },
  {
    label: 'FUNC',
    field: 'FUNC',
    maxLength: 2,
    required: true
  },
  {
    label: 'COST CNTR',
    field: 'COSTCNTR',
    maxLength: 4,
    required: false
  }
];


export default class MFK extends React.Component {
  constructor(props) {
    super();
    this.state = { setup_mfk: {...props.setup_mfk} };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(field, value, maxLength) {

    //
    let new_setup = { 
      ...this.state.setup_mfk,
      [field]: value
    };
    this.setState({setup_mfk: new_setup})
  }


  render() {
    // 
    //const focusEl = ReactDOM.findDOMNode(component as React.ReactInstance)!!.firstChild as Element;
    
    return (
      <div className="ms-slideRightIn20 ms-slideLeftOut20" style={row_style}>
        <FocusZone
          direction={FocusZoneDirection.horizontal}
          handleTabKey={TabTypes.inputOnly}
          isCircularNavigation={false}
          allowFocusRoot={false}>
          {fields.map((field, idx) => {
            return (
              <div key={idx}>
                <TextField
                  label={field.label}
                  className={`MFK--${field.field}`}
                  maxLength={field.maxLength}
                  value={this.state.setup_mfk[field.field]}
                  onChange={evt => this.onFieldChange(field.field, evt.target.value, field.maxLength)}
                />
              </div>);
          })}
        </FocusZone>
      </div>
    );
  }
}