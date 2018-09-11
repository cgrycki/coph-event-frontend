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
      data={"M16.24,14.79A1.08,1.08,0,0,1,15.61,16a11.67,11.67,0,0,1-4.89.11A1.08,1.08,0,0,1,10,14.93l-.52-.83-.06.6a.18.18,0,0,0,.17.19l.4,0a.18.18,0,0,0,.19-.17l0-1.08.09-2.08a.18.18,0,0,0-.17-.19l-.2,0a.18.18,0,0,0-.19.16l-.28,2.54.62-3.26c0,.06,0,.11.19.08l0,0a.63.63,0,0,1,.28-.2A9,9,0,0,1,13,10.31a9,9,0,0,1,2.46.32.63.63,0,0,1,.29.19l0,0s.1.06.19-.09v0a.63.63,0,0,0-.44-.53A9,9,0,0,0,13,9.88a9,9,0,0,0-2.47.44.63.63,0,0,0-.41.55l.12.56h0a.63.63,0,0,1,.43-.56,8.66,8.66,0,0,1,4.73-.11.63.63,0,0,1,.45.54h0l.07,0a.18.18,0,0,0-.16.19L16,13.55l.1,1.08a.18.18,0,0,0,.2.16l.4,0a.18.18,0,0,0,.16-.2l-.09-.59-.39-2.53a.18.18,0,0,0-.2-.15l-.2,0" }
      fill="rgba(255, 255, 255, 255)"
      stroke={(id === selected_item) ? '#0078d4' : "#333"}
      strokeWidth={0.5}
    />
  );
}

