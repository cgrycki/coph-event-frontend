/**
 * Event Details Component. Responsible for rendering event information.
 */

import React          from 'react';
import { 
  Label,
  Toggle 
}                     from 'office-ui-fabric-react';
import { getDateISO } from '../../utils/date.utils';

export default class EventDetails extends React.PureComponent {
  renderLabel(text) {
    /* Renders label with semilight font weight and secondary colored text. */
    return (
      <Label className="ms-fontWeight-semilight ms-fontColor-neutralSecondaryAlt">
        {text}:{' '}
      </Label>
    );
  }

  renderHeader(name, room) {
    /* Renders an overview header. */
    return (
      <div className="EventPageHeader">
        <div>
          {this.renderLabel("Event Name")}
          {name}
        </div>

        <div>
          {this.renderLabel("Room Number")}
          {room}
        </div>
      </div>
    );
  }

  renderDateTimes(date, start, end) {
    /* Renders row to display date and times. */
    
    return (
      <div className="EventPageDateTimes">
        <div>
          {this.renderLabel("Date")}
          {getDateISO(date)}
        </div>

        <div>
          {this.renderLabel("Start")}
          {start || " "}
        </div>

        <div>
          {this.renderLabel("End")}
          {end || " "}
        </div>
      </div>
    );
  }

  renderProviders(required, food_provider, drink_provider) {
    /* Renders a row displaying food and drink providers. */
    
    return (
      <div className="EventPageProviders">
        <div>
          {this.renderLabel("Providing Food & Drink")}
          <Toggle
            onText="Yes"
            offText="No"
            disabled={true}
            defaultValue={required}
          />
        </div>

        <div>
          {this.renderLabel("Food Provider")}
          {food_provider || "None"}
        </div>
        <div>
          {this.renderLabel("Alcohol Provider")}
          {drink_provider || "None"}
        </div>
      </div>
    );
  }

  renderCourse(required, course) {
    /* Renders row to view course. */
    return (
      <div className="EventPageCourse">
        <div>
          {this.renderLabel("References Course")}
          <Toggle
            onText="Yes"
            offText="No"
            disabled={true}
            defaultValue={required}
          />
        </div>

        <div>
          {this.renderLabel("Course Name")}
          {course || "None"}
        </div>
      </div>
    );
  }

  renderSetup(required, setup_mfk) {
    /* Renders the financial info for furniture setup. */
    return (
      <div className="EventPageSetup">
        <div>
          {this.renderLabel("Requires Furniture & Setup")}
          <Toggle
            onText="Yes"
            offText="No"
            disabled={true}
            defaultValue={required}
          />
        </div>

        <div>
          {this.renderLabel("MFK Number")}
          {setup_mfk || "None"}
        </div>
      </div>
    );
  }



  render() {
    const { event } = this.props;

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">

          <div className="EventPageRow">
            {this.renderHeader(
              event.event_name,
              event.room_number)}
          </div>
          
          <div className="EventPageRow">
            {this.renderLabel("On-Site Contact Email")}
            {event.contact_email}
          </div>

          <div className="EventPageRow">
            {this.renderLabel("Expected Attendance")}
            {event.num_people}
          </div>          

          <div className="EventPageRow">
            {this.renderDateTimes(
              event.date, 
              event.start_time, 
              event.end_time)}
          </div>

          <div className="EventPageRow">
            {this.renderProviders(
              event.food_drink_required, 
              event.food_provider, 
              event.alcohol_provider)}
          </div>

          <div className="EventPageRow">
            {this.renderSetup(
              event.setup_required, 
              event.setup_mfk)}
          </div>

          <div className="EventPageRow">
            {this.renderCourse(
              event.references_course,
              event.referenced_course)}
          </div>

          <div className="EventPageRow">
            {this.renderLabel("Additional Comments")}
            {event.comments}
          </div>

        </div>
      </div>
    );
  }
}