import React from 'react';
import { Circle, Group, Rect, Path } from 'react-konva';

export function CircleFurn(id, selected_item=null) {
  return (
    <Circle
      name="furnItem"
      radius={5}
      fill="#ebebeb"
      stroke={(id === selected_item) ? '#0078d4' : '#333333'}
      strokeWidth={1.5}
      //offsetX={-2.5}
      //offsetY={-2.5}
    />
  );
}


export function ChairFurn(id, selected_item) {
  return (
    <Group
      name="furnItem"
      offsetX={1.5}
      offsetY={1.5}
    >
      <Rect
        width={3}
        height={3}
        fill="#805716"
        stroke={(id === selected_item) ? '#0078d4' : "#805716"}
        strokeScaleEnabled={false}
      />
      <Rect
        width={3}
        height={1}
        fill="#D4A985"
      />
    </Group>
  );
}

export function ChairPath(id, selected_item) {
  return (
    <Path
      name="furnItem"
      data={"M3.37,1.85a1.17,1.17,0,0,1-.68,1.28A12.67,12.67,0,0,1,0,3.48a12.67,12.67,0,0,1-2.66-.22A1.17,1.17,0,0,1-3.36,2l-.57-.9L-4,1.76A.19.19,0,0,0-3.82,2l.44,0a.19.19,0,0,0,.21-.18L-3.12.64-3-1.61a.19.19,0,0,0-.18-.2l-.22,0a.19.19,0,0,0-.21.17l-.3,2.76.68-3.54c0,.06,0,.12.21.08l0,0a.68.68,0,0,1,.31-.22A9.81,9.81,0,0,1-.11-3a9.81,9.81,0,0,1,2.67.35.68.68,0,0,1,.32.21l0,0c0,.05.11.06.2-.09v0a.68.68,0,0,0-.48-.58,9.81,9.81,0,0,0-2.7-.35A9.81,9.81,0,0,0-2.8-3a.68.68,0,0,0-.45.6l.13.61h0a.68.68,0,0,1,.46-.6A9.81,9.81,0,0,1-.1-2.81a9.81,9.81,0,0,1,2.57.3A.68.68,0,0,1,3-1.93H3L3-2a.19.19,0,0,0-.17.21L3.07.5l.11,1.17a.19.19,0,0,0,.22.17l.44-.05A.19.19,0,0,0,4,1.57L3.9.93,3.47-1.82A.19.19,0,0,0,3.25-2L3-2"}
      fill="rgba(255, 255, 255, 255)"
      stroke={(id === selected_item) ? '#0078d4' : "#333"}
      strokeWidth={0.5}
    />
  );
}


