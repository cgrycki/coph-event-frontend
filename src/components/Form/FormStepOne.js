// Dependecies
import React, { Component } from 'react';
import { Checkbox }         from 'office-ui-fabric-react/lib/Checkbox';
import {
  FormTitle,
  FormStep,
  FormButtons
}                           from './shared';


export default class FormStepOne extends Component {
  state = {
    agreedToTerms: false
  }

  prevPage = () => this.props.history.goBack(-1);
  nextPage = () => this.props.history.push('/form/who');
  validate = () => this.state.agreedToTerms === true;
  toggle   = val => this.setState({ agreedToTerms: val });

  render() {
    return(
      <FormStep>
        <FormTitle progress={0} />
        
        <div className="ms-Grid-row ms-slideRight40 FormFieldRow FormTerms">
          <div className="ms-Grid-col ms-sm12">
            <h3>After Hours</h3>
            <p>If you are making a request for space outside of the normal building hours, a College of Public Health departmental sponsor is required. Units making reservations will be required to identify a departmental faculty or staff member who will be present on-site during the event and responsible for clean-up.</p>
          </div>

          <div className="ms-Grid-col ms-sm12">
            <h3>Event Set-up and Tear-down</h3>
            <p>Users are responsible for set up and tear-down, however, limited student help may be available. To request assistance, please note in the event request form 'comments' field and we will check their availability. If assistance is not available, a requisition is required to acquire UI Movers.</p>
          </div>

          <div className="ms-Grid-col ms-sm12">
            <h3>Clean Up</h3>
            <p>Event sponsors are required to take all recycle and trash from their event out to the appropriate dumpsters to the north of the building following the event. Please do not place your garbage on the floor or trash/recycle bins for the custodial staff to remove.</p>
          </div>

          <div className="ms-Grid-col ms-sm12">
            <h3>Damages</h3>
            <p>In the unlikely event that extra maintenance or repairs are required following an event, any costs will be assessed along to the event sponsor. An MFK will be required when submitting your event request form.</p>
          </div>

          <div className="ms-Grid-col ms-sm12 FormTermAgree">
            <Checkbox
              label="I have read and agree to the Terms and Conditions"
              value={this.state.agreedToTerms}
              onChange={(evt, val) => this.toggle(val)}
            />
          </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={!this.validate()}
        />
      </FormStep>
    );
  }
}