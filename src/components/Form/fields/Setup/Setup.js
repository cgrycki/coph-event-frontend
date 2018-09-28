import React      from 'react';
import { Label }  from 'office-ui-fabric-react/lib/Label';
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
  render() { 
    const { setup_error } = this.props;

    return (
      <div className="ms-Grid-row FormFieldRow">
        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-xl3 ms-xxl3">
          <Label>Furniture and/or setup required?</Label>
          {setup_error &&  
            <span style={{color: 'rgb(168, 0, 0)'}}>
              {setup_error}
              </span>
            }
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