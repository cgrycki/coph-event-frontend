import React          from 'react';
import { CommandBar } from 'office-ui-fabric-react';
import { navigate }   from 'react-big-calendar/lib/utils/constants';

export default class FormToolbar extends React.Component {
  navigate = action => {
    this.props.onNavigate(action);
  }

  view = view => {
    this.props.onViewChange(view);
  }
  
  render() {
    let { label } = this.props;
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
      />
    );
  }
}