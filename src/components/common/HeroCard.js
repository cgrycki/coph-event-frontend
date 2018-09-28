import React, { Component } from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';



export default class HeroCard extends Component {
  render() {
    const { iconName, text, subtext, onClick, primary } = this.props; 
    
    // Assign a class if this is the 'action' card
    const cardClass = (primary) ?
      'HeroCard HeroCard--ActionCard' :
      `HeroCard HeroCard--${iconName}`;

    return (
      <div className={cardClass}>
        <header onClick={onClick} >
          <Icon iconName={iconName} />
        </header>
        <div className="HeroCard--button">
          <CompoundButton
            className="test"
            text={text}
            secondaryText={subtext}
            primary={primary}
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
}