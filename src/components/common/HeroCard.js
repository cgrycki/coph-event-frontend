import React, { Component } from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';



export default class HeroCard extends Component {
  render() {
    const { iconName, text, subtext, onClick, primary } = this.props; 
    
    return (
      <div className="HeroCard">
        <header>
          <Icon iconName={iconName} />
        </header>
        <CompoundButton
          text={text}
          secondaryText={subtext}
          primary={primary}
          onClick={onClick}
        />
      </div>
    );
  }
}