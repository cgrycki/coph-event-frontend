import React           from 'react';
import { Group, Text } from 'react-konva';

export default class HUD extends React.Component {
  /** Transforms our furniture counts objects into a list of items */
  createCountText = (counts) => {
    const labels = {
      chair   : 'Chairs',
      circle  : 'Circular Tables',
      rect    : 'Rectangular Tables',
      cocktail: 'Bar Top (cocktail style) Tables',
      display : 'Display Boards',
      trash   : 'Trash Cans'
    };

    const left = `Chairs\nCircular Tables\nRectangular Tables\nCocktail Tables\nDisplay Boards\nTrash Cans`;
    const right = `${counts.chair}\n${counts.circle}\n${counts.rect}\n${counts.cocktail}\n${counts.display}\n${counts.trash}`;


    return { left, right };
  }

  render() {
    const { counts, height } = this.props;
    const { left, right }    = this.createCountText(counts);
    const y                  = height * 0.85;

    return (
      <Group x={50} y={y} >
        <Text
          text={left}
          align="right"
          fontSize={14}
          fontFamily="monospace"
          lineHeight={1.25}
        />
        <Text
          text={right}
          align="left"
          fontSize={14}
          fontFamily="monospace"
          lineHeight={1.25}
          offsetX={-150}
          opacity={0.8}
        />
      </Group>
    );
  }
}