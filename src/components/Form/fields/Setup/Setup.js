import React      from 'react';
import { Toggle } from 'office-ui-fabric-react';
import MFK        from './MFK';


/**
 * Renders the HTML field to input U. Iowa MFK number if setup is required
 * 
 * @example
 * 
 * ```
 * Props:
 *  * Fields 
 *  * FUND
 *  * ORG
 *  * DEPT
 *  * SUB DEPT
 *  * GRANT PROGRAM
 *  * INST ACCT
 *  * ORG ACCT 
 *  * DEPT ACCT 
 *  * FUNC COST CNTR
 *
 */
export default class Setup extends React.Component {
  constructor() {
    super();
  }

  render() {
    // Styles the row 
    const setup_styles = {
      "padding"       : "0px 8px",
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row"
    }
    
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-xl3 ms-xxl3">
          <Toggle
            defaultChecked={false}
            label={"Furniture and setup required?"}
            onText="Yes"
            offText="No"
            onChanged={(evt) => this.props.onChange('setup_required', evt)}/>
        </div>
        <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9 ms-xl9 ms-xxl9">
          {this.props.setup_required && 
            <MFK 
              setup_mfk={this.props.setup_mfk} 
              onChange={this.props.onChange}
            />}
        </div>
      </div>
    );
  }
}