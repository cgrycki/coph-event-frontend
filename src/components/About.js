import React, { Component } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';


const iconJS = (<Icon iconName="JS" className="About--icon" />);
const iconHeart = (<Icon iconName="HeartFill" className="About--icon About--heart" />);
const linkIT = (
  <a href="https://www.public-health.uiowa.edu/it/" target="_blank" rel="noopener noreferrer">
    Office of Information Technology
  </a>
);
const linkFacilities = (<a href="mailto:cph-facilities@uiowa.edu" target="_blank">cph-facilities@uiowa.edu</a>);
const linkSurvey = (<a href="https://www.public-health.uiowa.edu/it-customer-satisfaction/" target="_blank" rel="noopener noreferrer">satisfaction survey.</a>);


export default class About extends Component {
  render() {
    return (
      <div className="ms-Grid-col ms-sm10 ms-smPush1 About">

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-lg9 ms-xxl8">
            <h3>CPHB Events</h3>
            <p>This application is for event planning at the College of Public Health (CoPH). It ties class schedules, room information, and geographic data together to offer CoPH employees a event management system.</p>
            <p>Users fill an Event Request form to create an Event. The event is queued for approval by the CoPH Facilities Manager. You can email the Facilities Manager at {linkFacilities}.</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-lg9 ms-xxl8">
            <h3>The Author</h3>
            <p className="About--iconRow">CPHB Events is made with {iconJS} and {iconHeart} by Ryan Larson. Ryan worked at the College of Public Health for four years as a student, before graduating with a Bachelors in Informatics in May 2017. Ryan's interests include Human Computer Interaction, data visualization, and design. He is currently moving to Austin, TX.</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-lg9 ms-xxl8">
            <h3>Information Technology</h3>
            <p>The College's {linkIT} manages and administers this application. Like how we're doing? Hate it? Either way, please let us know and fill out our {linkSurvey}</p>
            
            <div className="About--contact">
              <h4>Contact Information</h4>
              <p><em>Hours:</em>&emsp;Monday - Friday, 8am - 5pm</p>
              <p><em>Email:</em>&emsp;<a href="mailto:cph-it-support@uiowa.edu" target="_blank">cph-it-support@uiowa.edu</a></p>
              <p><em>Phone:</em>&emsp;<u>(319) 384-3838</u></p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
