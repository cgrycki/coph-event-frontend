import React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';


export default class FormButtons extends React.PureComponent {
  render() {
    let {
      prevPage, prevDisabled, prevText,
      nextPage, nextDisabled, nextText
    } = this.props;

    // Conditionally assign button sizes
    let button_type = undefined;
    if (nextText === undefined) button_type = 'hero';

    // Only the review page will alter the button text
    if (prevText === undefined) prevText = 'Previous';
    if (nextText === undefined) nextText = 'Next';

    return (
      <div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className="FormButtons">
            <div>
              <DefaultButton
                primary={false}
                disabled={prevDisabled}
                text={prevText}
                onClick={() => prevPage()}
              />
            </div>

            <div>
              <DefaultButton
                primary={true}
                disabled={nextDisabled}
                buttonType={button_type}
                text={nextText}
                onClick={() => nextPage()}
              />
            </div>
          </div>
          
        </div>
      </div>
      </div>
    );
  }
}