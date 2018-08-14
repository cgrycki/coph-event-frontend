/**
 * Event List Component
 */

import React         from 'react';
import { 
  DetailsList,
  CheckboxVisibility 
}                     from 'office-ui-fabric-react';
import { getDateISO } from '../../utils/date.utils';




export default class EventList extends React.Component {

  renderItems(events) {
    /* Renders rows from array of event objects. */
    
    let items = events.slice().map(item => ({
      key                : item.package_id,
      event_name         : item.event_name,
      room_number        : item.room_number,
      date               : getDateISO(item.date),
      approved           : item.approved.toString(),
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
        checkboxVisibility={CheckboxVisibility.onHover}
        onActiveItemChanged={(item) => this.onActiveItem(item)}
      />
    );
  }
}

const columns = [
  {
    key: 'event_name',
    name: 'Name',
    fieldName: 'event_name',
    minWidth: 160,
    maxWidth: 300,
    isResizable: true
  },
  {
    key: 'approved',
    name: 'Approved',
    fieldName: 'approved',
    minWidth: 60,
    maxWidth: 60,
    isResizable: false,
    onRender: (item) => {
      /* Renders a color column */
      const color = (item.approved === true) ? 'green' : 'red';
      return (<span className={`ms-fontColor-${color}`}>{item.approved}</span>);
    }
  },
  {
    key: 'date',
    name: 'Date',
    fieldName: 'date',
    minWidth: 80,
    isResizable: true
  },
  {
    key: 'room',
    name: 'Room',
    fieldName: 'room_number',
    minWidth: 80,
    isResizable: true
  },
  {
    key: 'setup',
    name: 'Setup Required',
    fieldName: 'setup_required',
    minWidth: 100,
    isResizable: true
  },
  {
    key: 'food_drink',
    name: 'Food/Drink Provided',
    fieldName: 'food_drink_required',
    minWidth: 100,
    isResizable: true
  }
];