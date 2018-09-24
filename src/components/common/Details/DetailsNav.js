/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
}                   from 'office-ui-fabric-react/lib/Pivot';
import './Details.css';

const makePivot = (key, text, icon) => (
  <PivotItem key={key} linkText={text} iconName={icon} />
);




/* React Component ----------------------------------------------------------*/
/**
 * Displays an Form Review page heading, consisting of pivots to view fields/layout.
 */
export default class DetailsNav extends React.Component {
  /** Returns an array of Office UI Pivot objects */
  getReviewPivots = () => {
    const { showLayout } = this.props;
    let pivotArray = [makePivot("Form", "Event Details", "TextDocument")];
    if (showLayout) 
      pivotArray.push(makePivot("Layout", "Layout", "PivotChart"));
    
    return pivotArray;
  }

  render() {
    const { selectedPivot, onToggle } = this.props;

    // Get a list of pivot items
    const pivotArray = this.getReviewPivots();

    return (
      <div className="ms-Grid-row DetailsNav">
        <div className="ms-Grid-col ms-sm12">
          <Pivot
            linkSize={PivotLinkSize.large}
            linkFormat={PivotLinkFormat.links}
            selectedKey={selectedPivot}
            onLinkClick={onToggle}
            headersOnly
          >
            {pivotArray}
          </Pivot>
        </div>
      </div>
    );
  }
}