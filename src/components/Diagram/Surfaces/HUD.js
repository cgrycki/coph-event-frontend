import React        from 'react';
import { connect }  from 'react-redux';
import { 
  DetailsList,
  CheckboxVisibility
} from 'office-ui-fabric-react/lib/DetailsList';


class HUD extends React.Component {
  /** Transforms our furniture counts objects into a list of items */
  createItems = (counts) => {
    const items = Object
      .entries(counts)
      .filter(([key, val]) => key.endsWith('_racks') === false)
      .map(([key, val]) => ({
        furn: key,
        count: val
      }));
    return items;
  }

  /** Returns a list of objects denoting column config */
  createColumns = () => {
    return [
      {
        key: 'furn',
        fieldName: 'furn',
        name: 'Furniture Type',
        minWidth: 80
      },
      {
        key: 'count',
        fieldName: 'count',
        name: 'Count',
        minWidth: 40
      }
    ];
  }

  render() {
    const { counts } = this.props;

    return (
      <div className="ms-Grid-row Diagram--HUD">
        <div className="ms-Grid-col ms-sm6">
          <DetailsList
            columns={this.createColumns()}
            items={this.createItems(counts)}
            checkboxVisibility={CheckboxVisibility.hidden}
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