import React          from 'react';
//import cn             from 'classnames';
import { CommandBar } from 'office-ui-fabric-react';
import { navigate }   from 'react-big-calendar/lib/utils/constants';


export default class Toolbar extends React.Component {
  navigate = action => {
    this.props.onNavigate(action);
  }

  view = view => {
    this.props.onView(view);
  }

  render() {
    let { label, view } = this.props;
    return (
      <CommandBar
        items={[
          {
            key: 'leftCaret',
            iconOnly: true,
            iconProps: { iconName: 'ChevronLeft'},
            onClick: this.navigate.bind(null, navigate.PREVIOUS)
          },
          {
            key: 'rightCaret',
            iconOnly: true,
            iconProps: { iconName: 'ChevronRight'},
            onClick: this.navigate.bind(null, navigate.NEXT)
          },
          {
            key: 'calendarHeader',
            text: label,
            disabled: true
          }
        ]}
        farItems={[
          {
            key: 'dayView',
            text: 'Day',
            onClick: this.view.bind(null, 'day')
          },
          {
            key: 'weekView',
            text: 'Week',
            onClick: this.view.bind(null, 'week')
          },
          {
            key: 'monthView',
            text: 'Month',
            onClick: this.view.bind(null, 'month')
          },
          {
            key: 'seperator',
            iconOnly: true,
            iconProps: { iconName: 'Separator'},
            disabled: true
          },
          {
            key: 'todayView',
            text: 'Today',
            className: (view === 'today') ? 'ms-fontWeight-semibold' : '',
            onClick: this.navigate.bind(null, navigate.TODAY)
          }
        ]}
      />
    );
  }
}