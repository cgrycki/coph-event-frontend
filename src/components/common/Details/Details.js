/**
 * Event Details Component. Responsible for rendering event information.
 */
import React                 from 'react';
import { Toggle, TextField } from 'office-ui-fabric-react';
import './Details.css';
//import { Shimmer, ShimmerElementsGroup, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';



export default class Details extends React.PureComponent {
  render() {
    const { loading, event } = this.props;
    const { 
      event_name: name, room_number: room, num_people: attendance,
      date, start_time: start, end_time: end,
      food_drink_required: refreshments, food_provider: food, alcohol_provider: drink,
      contact_email: contact, coph_email: coph,
      references_course: courseRef, referenced_course: course,
      setup_required: setupReq, setup_mfk: mfk,
      comments, 
    } = event;

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        <div className="spacer">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6">
              <TextField label={"Name"} value={name} disabled required />
            </div>

            <div className="ms-Grid-col ms-sm5 ms-md6 ms-lg2 ms-lgPush1 ms-xl2 ms-xxlPush1">
              <TextField label={"Room"} value={room} disabled required />
            </div>

            <div className="ms-Grid-col ms-sm4 ms-smPush1 ms-md3 ms-lg2 ms-lgPush2 ms-xxl2 ms-xxlPush2">
              <TextField label={"Attendance"} value={attendance} disabled required />
            </div>

          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm5 ms-md4 ms-lg3 ms-xl2">
              <TextField label={"Date"} value={date} disabled required />
            </div>

            <div className="ms-Grid-col ms-sm6 ms-smPush1 ms-md7 ms-lg3 ms-xl3 ms-xlPush1">
              <TextField label={"Starts - Ends"} value={`${start} - ${end}`} disabled required />
            </div>

            {coph && <div className="ms-Grid-col ms-sm12 ms-md7 ms-mdPush5 ms-lg4 ms-lgPush2 ms-xl5 ms-xlPush2">
                <TextField label={"College of Public Health Employee"} value={coph} disabled  required/>
              </div>}
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md4 ms-lg3 ms-xl3">
              <Toggle
                label={"Serving food or drinks?"}
                onText="Yes"
                offText="No"
                value={refreshments}
                disabled
              />
            </div>

            {(food || drink) && 
              <div className="ms-Grid-col ms-sm11 ms-smPush1 ms-md7 ms-lg8 ms-lgPush1 ms-xl5 ms-xlPush4">
                {food && <TextField label={"Food Vendor"} value={food} disabled />}
                {drink && <TextField label={"Drink Vendor"} value={drink} disabled />}
              </div>}
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md4 ms-lg3 ms-xl3">
              <Toggle
                label={"Furniture or setup required?"}
                onText="Yes"
                offText="No"
                value={!setupReq}
                disabled
              />
            </div>

            {mfk && 
              <div className="ms-Grid-col ms-sm11 ms-smPush1 ms-md7 ms-lg8 ms-lgPush1 ms-xl5 ms-xlPush4">
                <TextField label={"MFK"} value={'1234556789'} disabled />
              </div>}
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9 ms-md4 ms-lg3">
              <Toggle
                label={"For an University of Iowa course?"}
                onText="Yes"
                offText="No"
                value={courseRef}
                disabled
              />
            </div>

            {course &&
              <div className="ms-Grid-col ms-sm11 ms-smPush1 ms-md7 ms-lg8 ms-lgPush1 ms-xl6 ms-xlPush3">
                <TextField label={"Course"} value={course || ''} disabled />
              </div>}
          </div>
            
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg9 ms-xl8 ms-xxl6">
              <TextField label={"Comments"} multiline={true} value={comments || ''} disabled />
            </div>
          </div>
          
        </div>
        </div>
      </div>
    );
  }
}