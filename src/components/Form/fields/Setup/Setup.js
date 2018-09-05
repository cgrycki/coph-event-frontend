import React      from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
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
export default class Setup extends React.PureComponent {
  render() { 
    let { setup_error } = this.props;


    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-xl3 ms-xxl3">
          <Toggle
            checked={this.props.setup_required}
            label={"Furniture and setup required?"}
            onText="Yes"
            offText="No"
            onChanged={(evt) => this.props.onChange('setup_required', evt)}/>
          {setup_error && 
            <span style={{color: 'rgb(168, 0, 0)'}}>{setup_error}</span>}
        </div>
        <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9 ms-xl9 ms-xxl9">
          <MFK
            setup_mfk={this.props.setup_mfk} 
            onChange={this.props.onChange}
            disabled={!this.props.setup_required}
          />
        </div>
      </div>
    );
  }
}