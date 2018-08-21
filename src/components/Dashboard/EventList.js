/**
 * Event List Component
 */

import React         from 'react';
import { push }      from 'connected-react-router';
import { 
  DetailsList,
  CheckboxVisibility,
  DefaultButton,
  buildColumns
}                     from 'office-ui-fabric-react';
import ActionButtons  from './ActionButtons';
import { getDateISO } from '../../utils/date.utils';



const columns = [
  {
    key: 'event_name',
    name: 'Name',
    fieldName: 'event_name',
    minWidth: 60,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'approved',
    name: 'Approved',
    fieldName: 'approved',
    minWidth: 30,
    isResizable: true,
    onRender: (item) => {
      /* Renders a color column */
      const color = (item.approved === "true") ? 'green' : 'red';
      return (<p className={`ms-fontColor-${color}`}>{item.approved}</p>);
    }
  },
  {
    key: 'date',
    name: 'Date',
    fieldName: 'date',
    minWidth: 70,
    isResizable: true
  },
  {
    key: 'room',
    name: 'Room',
    fieldName: 'room_number',
    minWidth: 60,
    isResizable: true
  },
  {
    key: 'setup',
    name: 'Setup Required',
    fieldName: 'setup_required',
    minWidth: 80,
    isResizable: true
  },
  {
    key: 'food_drink',
    name: 'Food/Drink Provided',
    fieldName: 'food_drink_required',
    minWidth: 80,
    isResizable: true
  },
  {
    key: 'actions',
    name: ' ',
    fieldName: 'package_id',
    minWidth: 80,
    isResizable: true,
    onRender: (item) => {
      return (
        <ActionButtons

        />
      )
    }
  }
];

export default class EventList extends React.Component {
  renderItemCol(item, index, column) {
    const { dispatch } = this.props;

    switch(column.key) {
      case 'package_id':
        return (
          <ActionButtons

          />
        );
      default:
        <span>{item[column.key]}</span>
    }
  }


  renderItems(events) {
    /* Renders rows from array of event objects. */
    
    let items = events.slice().map(item => ({
      key                : item.package_id,
      event_name         : item.event_name,
      room_number        : item.room_number,
      date               : getDateISO(item.date),
      approved           : item.approved,
      setup_required     : item.setup_required.toString(),
      food_drink_required: item.food_drink_required.toString()
    }));

    return items;
  }

  onActiveItem(item) {
    /* Callback for selecting an event in our details list. */
    let { history } = this.props;
    let event_page = `/event/${item.key}`;
    history.push(event_page);
  }


  
  render() {
    let { events } = this.props;
    return (
      <DetailsList
        items={this.renderItems(events)}
        columns={columns}
        checkboxVisibility={CheckboxVisibility.hidden}
        onRenderItemColumn={this.renderItemCol}
        //onActiveItemChanged={(item) => this.onActiveItem(item)}
      />
    );
  }
}


