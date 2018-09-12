/**
 * Event Details Component. Responsible for rendering event information.
 */
import React  from 'react';
import { 
  Label, 
  Toggle, 
  TextField 
}             from 'office-ui-fabric-react';
import { 
  Shimmer, 
  ShimmerElementType as ElemType 
}             from 'office-ui-fabric-react/lib/Shimmer';
import MFK from '../../Form/fields/Setup/MFK';
import './Details.css';

const labelWrapper = (label) => (
  <Label required={true} disabled>{label}</Label>
);

const textFieldWrapper = (value, loaded) => (
  <Shimmer 
    isDataLoaded={loaded}
    shimmerElements={[{type: ElemType.line, height: 30, width: '100%' }]}>
    <TextField 
      className={loaded ? "ms-slideRightIn20" : ''}
      value={value} 
      disabled />
  </Shimmer>
);

const toggleWrapper = (value, loaded) => (
  <Shimmer  
    isDataLoaded={loaded}
    shimmerElements={[
      {type: ElemType.line, height: 20, width: 40},
      {type: ElemType.gap, height: 20, width: 10},
      {type: ElemType.line, height: 20, width: 10},
    ]}>
    <Toggle 
      defaultChecked={value}
      onText="Yes"
      offText="No"
      disabled={true} />
  </Shimmer>
);


export default class Details extends React.PureComponent {
  render() {
    const { event } = this.props;
    const { 
      event_name: name, room_number: room, num_people: attendance,
      date, start_time: start, end_time: end,
      food_drink_required: refreshments, food_provider: food, alcohol_provider: drink,
      contact_email: contact, coph_email: coph,
      references_course: courseRef, referenced_course: course,
      setup_required: setupReq, setup_mfk: mfk,
      comments, 
    } = event;

    let should_shimmer = (room !== undefined);

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        <div className="spacer">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6">
              {labelWrapper('Event Name')}
              {textFieldWrapper(name, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm5 ms-md6 ms-lg2 ms-lgPush1 ms-xl2 ms-xxlPush1">
              {labelWrapper('Room')}
              {textFieldWrapper(room, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm4 ms-smPush3 ms-md3 ms-lg2 ms-lgPush2 ms-xxl2 ms-xxlPush2">
              {labelWrapper('Attendance')}
              {textFieldWrapper(attendance, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6 ms-xxl6">
              {contact && labelWrapper('Primary Contact Email')}
              {contact && textFieldWrapper(contact, should_shimmer)}
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm5 ms-md4 ms-lg3 ms-xl2">
              {labelWrapper('Date')}
              {textFieldWrapper(date, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm6 ms-smPush1 ms-md7 ms-lg3 ms-xl3 ms-xlPush1">
              {labelWrapper('Start - End')}
              {textFieldWrapper(`${start} - ${end}`, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm12 ms-md7 ms-mdPush5 ms-lg4 ms-lgPush2 ms-xl5 ms-xlPush2">
              {coph && labelWrapper('CoPH Employee')}
              {coph && textFieldWrapper(coph, should_shimmer)}
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md4 ms-lg3 ms-xl3">
              {labelWrapper('Serving Food or Drinks?')}
              {toggleWrapper(refreshments, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm11 ms-smPush1 ms-md7 ms-lg8 ms-lgPush1 ms-xl5 ms-xlPush4">
              {food && labelWrapper("Food Vendor")} 
              {food && textFieldWrapper(food, should_shimmer)}
              {drink && labelWrapper("Drink Vendor")}
              {drink && textFieldWrapper(drink, should_shimmer)}
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md6 ms-lg4 ms-xxl3">
              {labelWrapper("Furniture or Setup Required?")}
              {toggleWrapper(setupReq, should_shimmer)}
            </div>

            <div className="ms-Grid-col ms-sm12 ms-lg8 ms-xxl9">
              {mfk && <MFK setup_mfk={mfk} disabled={true} />}
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md4 ms-lg3">
              {labelWrapper("Is this for a University Course?")}
              {toggleWrapper(courseRef, should_shimmer)}
            </div>
            
            <div className="ms-Grid-col ms-sm11 ms-smPush1 ms-md7 ms-lg8 ms-lgPush1 ms-xl6 ms-xlPush3">
              {courseRef && labelWrapper("Course")}
              {courseRef && textFieldWrapper(course, should_shimmer)}
            </div>
          </div>
            
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6">
              <Shimmer 
                isDataLoaded={should_shimmer}
                shimmerElements={[{type: ElemType.line, height: 60, width: '100px'}]}>
                  <TextField 
                    label="Comments" 
                    multiline={true} 
                    autoAdjustHeight={true}
                    value={comments || ''} 
                    disabled />
              </Shimmer>
            </div>
          </div>
          
        </div>
        </div>
      </div>
    );
  }
}