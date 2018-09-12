import React        from 'react';
import { connect }  from 'react-redux';
import { 
  DetailsList,
  CheckboxVisibility
} from 'office-ui-fabric-react/lib/DetailsList';
import { computeFurnitureCounts } from '../utils/computeFurnitureCounts';


class HUD extends React.Component {
  /** Transforms our furniture counts objects into a list of items */
  createListItems = (counts) => {
    const labels = {
      chair   : 'Chairs',
      circle  : 'Circular Tables',
      rect    : 'Rectangular Tables',
      cocktail: 'Bar Top (cocktail style) Tables',
      display : 'Display Boards',
      trash   : 'Trash Cans'
    };

    const items = Object
      .entries(counts)
      .filter(([key, val]) => key.endsWith('_racks') === false)
      .map(([key, val]) => ({
        furn: labels[key],
        count: val
      }));
    return items;
  }

  /** Returns a list of objects denoting column config */
  createListColumns = () => {
    return [
      {
        key: 'furn',
        fieldName: 'furn',
        name: 'Furniture Type',
        minWidth: 80,
        headerClassName: 'ms-fontWeight-semibold'
      },
      {
        key: 'count',
        fieldName: 'count',
        name: 'Count',
        minWidth: 40,
        headerClassName: 'ms-fontWeight-semibold'
      }
    ];
  }

  render() {
    const { counts, chairs_per_table } = this.props;
    const computed = computeFurnitureCounts(counts, chairs_per_table);

    return (
      <div className="ms-Grid-row Diagram--HUD">
        <div className="ms-Grid-col ms-sm6">
          <DetailsList
            columns={this.createListColumns()}
            items={this.createListItems(computed)}
            checkboxVisibility={CheckboxVisibility.hidden}
            compact
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  counts: state.diagram.counts,
  chairs_per_table: state.diagram.layout.chairs_per_table
});

export default connect(mapStateToProps)(HUD);