import React from 'react';
import { Circle, Group, Rect, Path } from 'react-konva';


const FURN_PATHS = {
  TABLE_8_CHAIRS: "M18.21,30.11H12.42V24.32h5.79v4.61H12.42m-5.56-9L11,24,6.86,28.12,2.77,24l4.09-4.09L3.61,23.19,7.7,27.28m15.67,0,4.09-4.09.84.84L24.21,20l-4.09,4.09,4.09,4.09,4.09-4.09M.13,12.41v5.79H5.91V12.41H1.31v5.79M2.82,6.6,6.91,10.7,11,6.6,6.91,2.51,2.82,6.6l.84.84L7.75,3.35M16,8.21m-1,0-1,0,14.83,4.27v5.79h1.18V12.48H24.34v5.79M23.19,3.7l4.09,4.09L28.13,7,24,2.86,19.94,7,24,11,28.13,7m-15.64-1h5.79V.13H12.48V1.31h5.79M7.89,15.13A7.24,7.24,0,1,0,15.13,7.9,7.24,7.24,0,0,0,7.89,15.13Zm4.68,1.74,5.64-5.64M9.88,19l8.46-8.46M9.77,17.3l7.84-7.84M13.29,21.29l6.59-6.59",
  CHAIR: "M16.24,14.79A1.08,1.08,0,0,1,15.61,16a11.67,11.67,0,0,1-4.89.11A1.08,1.08,0,0,1,10,14.93l-.52-.83-.06.6a.18.18,0,0,0,.17.19l.4,0a.18.18,0,0,0,.19-.17l0-1.08.09-2.08a.18.18,0,0,0-.17-.19l-.2,0a.18.18,0,0,0-.19.16l-.28,2.54.62-3.26c0,.06,0,.11.19.08l0,0a.63.63,0,0,1,.28-.2A9,9,0,0,1,13,10.31a9,9,0,0,1,2.46.32.63.63,0,0,1,.29.19l0,0s.1.06.19-.09v0a.63.63,0,0,0-.44-.53A9,9,0,0,0,13,9.88a9,9,0,0,0-2.47.44.63.63,0,0,0-.41.55l.12.56h0a.63.63,0,0,1,.43-.56,8.66,8.66,0,0,1,4.73-.11.63.63,0,0,1,.45.54h0l.07,0a.18.18,0,0,0-.16.19L16,13.55l.1,1.08a.18.18,0,0,0,.2.16l.4,0a.18.18,0,0,0,.16-.2l-.09-.59-.39-2.53a.18.18,0,0,0-.2-.15l-.2,0" 
}



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

export function table8(id, selected_item) {
  return (
    <Group>
      <Path
        data={FURN_PATHS['TABLE_8_CHAIRS']}
        fill="#ffffff"
        stroke={(id === selected_item) ? '#0078d4' : "#333"}
        strokeWidth={0.5}
      />
    </Group>
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
      data={FURN_PATHS['CHAIR']}
      fill="rgba(255, 255, 255, 255)"
      stroke={(id === selected_item) ? '#0078d4' : "#333"}
      strokeWidth={0.5}
    />
  );
}

