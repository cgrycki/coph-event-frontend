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

  render() {
    const { counts, height, x, y, scaleX, scaleY }      = this.props;
    const hudText = this.createCountText(counts);

    return (
      <Group
        x={(-x/scaleX) + (15 / scaleX)}
        y={(-y/scaleY) +(0.85*height / scaleY)}
        scaleX={1}
        scaleY={1}>
        <Text
          text={hudText}
          align="left"
          fontSize={14 / scaleX}
          fontFamily="monospace"
          lineHeight={1.25}
        />
      </Group>
    );
  }
}