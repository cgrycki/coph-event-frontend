import React          from 'react';
import { navigate }   from 'react-big-calendar/lib/utils/constants';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import LabelRender    from '../common/LabelRender';


export default class FormToolbar extends React.Component {
  navigate = action => {
    this.props.onNavigate(action);
  }

  view = view => {
    this.props.onViewChange(view);
  }
  
  render() {
    const { label, view: currentView } = this.props;

    const renderLabel = 'Room Schedule';
    const info        = 'You can select a date/time slot by clicking or dragging on an empty portion of the calendar.';
    const reqd        = false;

    return (
      <React.Fragment>
        <LabelRender label={renderLabel} info={info} required={reqd} />
        <CommandBar
          items={[
            {
              key: 'leftCaret',
              iconOnly: true,
              iconProps: { iconName: 'ChevronLeft' },
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
              key: 'work_week',
              iconOnly: false,
              text: 'Work Week',
              iconProps: { iconName: 'CalendarWorkWeek'},
              onClick: (evt, item) => this.view(item.key),
              disabled: currentView === 'work_week'
            },
            {
              key: 'week',
              iconOnly: false,
              text: 'Week',
              iconProps: { iconName: 'CalendarWeek'},
              onClick: (evt, item) => this.view(item.key),
              disabled: currentView === 'week'
            }
          ]}
        />
      </React.Fragment>
    );
  }
}