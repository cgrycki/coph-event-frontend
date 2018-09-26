import React           from 'react';
import {
  Group,
  Text,
  Rect
} from 'react-konva';
import inventory       from '../../../constants/inventory';


export default class HUD extends React.Component {
  /** Transforms our furniture counts objects into a list of items */
  createCountText = (counts) => {
    const labels = {
      chair   : 'Chairs',
      circle  : 'Circular Tables',
      rect    : 'Rectangular Tables',
      cocktail: 'Bar Top Tables',
      display : 'Display Boards',
      trash   : 'Trash Cans'
    };

    const chairText    = `${labels.chair}             ${counts.chair}\t/\t${inventory.chair}\n`;
    const circleText   = `${labels.circle}    ${counts.circle}\t/\t${inventory.circle}\n`;
    const rectText     = `${labels.rect} ${counts.rect}\t/\t${inventory.rect}\n`;
    const cocktailText = `${labels.cocktail}     ${counts.cocktail}\t/\t${inventory.cocktail}\n`;
    const displayText  = `${labels.display}     ${counts.display}\t/\t${inventory.display}\n`;
    const trashText    = `${labels.trash}         ${counts.trash}\t/\t${inventory.trash}\n`;
    const hudText = chairText + circleText + rectText + cocktailText + displayText + trashText;

    return hudText;
  }

  /* Parses furniture counts and returns a column of rack counts text */
  createRackText = (counts) => {
    const chairText   = `Racks  ${counts.chair_racks}\n`;
    const circleText  = `Racks  ${counts.circle_racks}\n`;
    const rectText    = `Racks  ${counts.rect_racks}\n`;
    const cocktailText= `Racks  ${counts.cocktail_racks}\n`;
    const rackText = chairText + circleText + rectText + cocktailText;

    return rackText;
  }

  render() {
    const { cphit, counts, width, height, x, y, scaleX, scaleY } = this.props;
    
    // Textual information for end users
    const hudText = this.createCountText(counts);
    // Textual information for CPHIT
    const rackText = this.createRackText(counts);
    const opacity = (cphit) ? 1 : 0;

    return (
      <Group
        x={(-x/scaleX) + (15 / scaleX)}
        y={(-y/scaleY) +(0.85*height / scaleY)}
        scaleX={1}
        scaleY={1}>
        <Rect
          width={(0.33 * width) / scaleX}
          height={0.15 * height}
          cornerRadius={3}
          shadowBlur={3}
          shadowColor="#666666"
          shadowOpacity={0.5}
          shadowOffset={{x: 3, y: 3}}
          fill="#ffffff"
          stroke="#666666"
          strokeWidth={0.5}
          opacity={opacity}
          offsetX={5}
          offsetY={5}
        />
        <Text
          text={hudText}
          align="left"
          fontSize={14 / scaleX}
          fontFamily="monospace"
          lineHeight={1.25}
        />
        <Text
          text={rackText}
          align="right"
          fontSize={14 / scaleX}
          fontFamily="monospace"
          lineHeight={1.25}
          offsetX={(-x/scaleX) + (0.25 * -width)}
          opacity={opacity}
        />
      </Group>
    );
  }
}