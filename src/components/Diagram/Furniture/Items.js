import React from 'react';
import { Circle, Rect, Path, Line } from 'react-konva';

const FURN_PATHS = {
  TABLE_8_CHAIRS: "M-10.86-7.53l3.61,3.61,3.61-3.61-3.61-3.61-3.61,3.61.74.74,3.61-3.61M-13,2.36h5.11V-2.75H-13V2.36h1V-2.75m4.43,13.61,3.61-3.61L-7.53,3.63l-3.61,3.61,3.61,3.61.74-.74L-10.4,6.51M2.36,13V7.89H-2.75V13H2.36V12H-2.75M10.86,7.53,7.25,3.91,3.63,7.53l3.61,3.61,3.61-3.61-.74-.74L6.51,10.4M13-2.36H7.89V2.75H13V-2.36H12V2.75M7.53-10.86,3.91-7.25,7.53-3.63l3.61-3.61L7.53-10.86l-.74.74L10.4-6.51M-2.36-13v5.11H2.75V-13H-2.36v1H2.75M-6.39,0A6.39,6.39,0,0,0,0,6.39,6.39,6.39,0,0,0,6.39,0,6.39,6.39,0,0,0,0-6.39,6.39,6.39,0,0,0-6.39,0Zm4.13,1.54,5-5M-4.63,3.37,2.84-4.1m-7.57,6L2.19-5M-1.62,5.44,4.2-.38",
  TABLE_6_CHAIRS: "M-2.43-13.25V-8H2.83v-5.26H-2.43v1.07H2.83M-12.8-4.46l4.55,2.63,2.63-4.55L-10.17-9-12.8-4.46l.93.54,2.63-4.55M-10.37,8.91l4.55-2.63L-8.45,1.73-13,4.36l2.63,4.55.93-.54-2.63-4.55M2.43,13.5V8.24H-2.83V13.5H2.43V12.43H-2.83M12.8,4.71,8.24,2.08,5.62,6.64l4.55,2.63L12.8,4.71l-.93-.54L9.24,8.73M10.37-8.67,5.82-6,8.45-1.48,13-4.11,10.37-8.67l-.93.54,2.63,4.55M-6.57.12A6.57,6.57,0,0,0,0,6.69,6.57,6.57,0,0,0,6.57.12,6.57,6.57,0,0,0,0-6.45,6.57,6.57,0,0,0-6.57.12Zm4.25,3.4L2.8-1.6M-4.77,3.59,2.92-4.09M-4.87,2.09,2.26-5M-1.67,5.72l6-6",
  CHAIR: "M16.24,14.79A1.08,1.08,0,0,1,15.61,16a11.67,11.67,0,0,1-4.89.11A1.08,1.08,0,0,1,10,14.93l-.52-.83-.06.6a.18.18,0,0,0,.17.19l.4,0a.18.18,0,0,0,.19-.17l0-1.08.09-2.08a.18.18,0,0,0-.17-.19l-.2,0a.18.18,0,0,0-.19.16l-.28,2.54.62-3.26c0,.06,0,.11.19.08l0,0a.63.63,0,0,1,.28-.2A9,9,0,0,1,13,10.31a9,9,0,0,1,2.46.32.63.63,0,0,1,.29.19l0,0s.1.06.19-.09v0a.63.63,0,0,0-.44-.53A9,9,0,0,0,13,9.88a9,9,0,0,0-2.47.44.63.63,0,0,0-.41.55l.12.56h0a.63.63,0,0,1,.43-.56,8.66,8.66,0,0,1,4.73-.11.63.63,0,0,1,.45.54h0l.07,0a.18.18,0,0,0-.16.19L16,13.55l.1,1.08a.18.18,0,0,0,.2.16l.4,0a.18.18,0,0,0,.16-.2l-.09-.59-.39-2.53a.18.18,0,0,0-.2-.15l-.2,0",
  TRASH: "M7.5,0A7.5,7.5,0,0,1,0,7.5,7.5,7.5,0,0,1-7.5,0,7.5,7.5,0,0,1,0-7.5,7.5,7.5,0,0,1,7.5,0ZM2.69,1.46l-1.16-2L3.39-1.64,4.34,0a1,1,0,0,1,.08.24A.94.94,0,0,1,4.26,1a.78.78,0,0,1-.1.14h0l-1.28,2a.65.65,0,0,1-.14.15.66.66,0,0,1-.42.15H1.23v.84L.16,2.46l1.06-2,0,1Zm1.46-.31-.1.09a.87.87,0,0,1-.62.23H2.69M-1.85-4a.94.94,0,0,1,.71-.25l.17,0,2.42,0,.2,0A.64.64,0,0,1,2-3.91L2.54-3l.72-.42-1,1.85L0-1.43l.84-.48L.08-3.19l-1.14,2-1.89-1L-2-3.85A1.12,1.12,0,0,1-1.85-4ZM-3.16,2.82A.8.8,0,0,0-3.09,3a.94.94,0,0,0,.56.5.9.9,0,0,0,.35.06H-.37V1.38H-2.71L-3.09,2a.88.88,0,0,0-.11.65,1.27,1.27,0,0,0,0,.14L-4.3.69a.66.66,0,0,1-.06-.2A.64.64,0,0,1-4.27.05l.55-.93-.72-.43h2.12L-1.14.6-2,.1l-.74,1.28M-1-4.26l.14,0a.89.89,0,0,1,.51.41l.4.63",
  NEW_TRASH: "M2.58-2.38H1.29v-.21a.68.68,0,0,0-.68-.68H-.61a.68.68,0,0,0-.68.68v.21H-2.58a.17.17,0,0,0-.17.17A.17.17,0,0,0-2.58-2h.31V2a.92.92,0,0,0,.92.92h2.7A.92.92,0,0,0,2.27,2V-2h.31a.17.17,0,0,0,.17-.17A.17.17,0,0,0,2.58-2.38ZM-.95-2.59a.34.34,0,0,1,.34-.34H.61a.34.34,0,0,1,.34.34v.21H-.95ZM1.92,2a.58.58,0,0,1-.57.57h-2.7A.58.58,0,0,1-1.92,2V-2H1.93V2ZM0,2a.17.17,0,0,0,.17-.17v-3A.17.17,0,0,0,0-1.42a.17.17,0,0,0-.17.17v3A.17.17,0,0,0,0,2Zm-1.12-.19a.17.17,0,0,0,.17-.17V-1.06a.17.17,0,0,0-.17-.17.17.17,0,0,0-.17.17V1.59A.17.17,0,0,0-1.12,1.76Zm2.24,0a.17.17,0,0,0,.17-.17V-1.06a.17.17,0,0,0-.17-.17.17.17,0,0,0-.17.17V1.59A.17.17,0,0,0,1.12,1.76ZM5,0A5,5,0,0,1,0,5,5,5,0,0,1-5,0,5,5,0,0,1,0-5,5,5,0,0,1,5,0Z",
  CLOSE_BUTTON: "M-2.5-2.5l5,5m-5,0,5-5"
}

const selectedPath = (id, selected_item) => (id === selected_item) ?
  '#0078d4' : '#333333';


export const CloseButton = furnType => {
  const offsetXFurns = {
    circle  : -13,
    chair   : -4,
    rect    : -7.5,
    cocktail: -4,
    display : -10,
    trash   : -7.5
  };
  const offsetYFurns = {
    circle  : 13,
    chair   : 3.5,
    rect    : 3.5,
    cocktail: 4,
    display : 2,
    trash   : 7.5
  };


  return (
    <Path
      name="closeButton"
      data={FURN_PATHS.CLOSE_BUTTON}
      stroke="#de2d26"
      strokeWidth={2}
      offsetX={offsetXFurns[furnType]}
      offsetY={offsetYFurns[furnType]}
    />
  );
}


export const Table8Chairs = (id, selected_item) => {
  return (
    <Path
      name="furnItem"
      data={FURN_PATHS['TABLE_8_CHAIRS']}
      fill="#ffffff"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}

export const Table6Chairs = (id, selected_item) => {
  return (
    <Path
      name="furnItem"
      data={FURN_PATHS['TABLE_6_CHAIRS']}
      fill="#ffffff"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}


export const Chair = (id, selected_item) => {
  return (
    <Path
      name="furnItem"
      data={"M3.37,1.85a1.17,1.17,0,0,1-.68,1.28A12.67,12.67,0,0,1,0,3.48a12.67,12.67,0,0,1-2.66-.22A1.17,1.17,0,0,1-3.36,2l-.57-.9L-4,1.76A.19.19,0,0,0-3.82,2l.44,0a.19.19,0,0,0,.21-.18L-3.12.64-3-1.61a.19.19,0,0,0-.18-.2l-.22,0a.19.19,0,0,0-.21.17l-.3,2.76.68-3.54c0,.06,0,.12.21.08l0,0a.68.68,0,0,1,.31-.22A9.81,9.81,0,0,1-.11-3a9.81,9.81,0,0,1,2.67.35.68.68,0,0,1,.32.21l0,0c0,.05.11.06.2-.09v0a.68.68,0,0,0-.48-.58,9.81,9.81,0,0,0-2.7-.35A9.81,9.81,0,0,0-2.8-3a.68.68,0,0,0-.45.6l.13.61h0a.68.68,0,0,1,.46-.6A9.81,9.81,0,0,1-.1-2.81a9.81,9.81,0,0,1,2.57.3A.68.68,0,0,1,3-1.93H3L3-2a.19.19,0,0,0-.17.21L3.07.5l.11,1.17a.19.19,0,0,0,.22.17l.44-.05A.19.19,0,0,0,4,1.57L3.9.93,3.47-1.82A.19.19,0,0,0,3.25-2L3-2"}
      fill="rgba(255, 255, 255, 255)"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}


export const RectTable = (id, selected_item) => {
  return (
    <Rect
      name="furnItem"
      width={15}
      height={7}
      offsetX={7.5}
      offsetY={3.5}
      fill="#ffffff"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}

export const DisplayBoard = (id, selected_item) => {
  return (
    <React.Fragment>
      <Line stroke={selectedPath(id, selected_item)} points={[-9.5, 1, -10.5, 1.75]}   lineCap="round" strokeWidth={1} />
      <Line stroke={selectedPath(id, selected_item)} points={[-9.5, -1, -10.5, -1.75]} lineCap="round" strokeWidth={1} />
      <Line stroke={selectedPath(id, selected_item)} points={[9.5, 1, 10.5, 1.75]}     lineCap="round" strokeWidth={1} />
      <Line stroke={selectedPath(id, selected_item)} points={[9.5, -1, 10.5, -1.75]}   lineCap="round" strokeWidth={1} />
      <Rect
        name="furnItem"
        width={20}
        height={2}
        offsetX={10}
        offsetY={1}
        cornerRadius={1}
        fill="#ffffff"
        stroke={selectedPath(id, selected_item)}
        strokeWidth={0.5}
      />
    </React.Fragment>
  );
}

export const CocktailTable = (id, selected_item) => {
  return (
    <Circle
      name="furnItem"
      radius={4}
      fill="#ffffff"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}


export const TrashCan = (id, selected_item) => {
  return (
    <Path
      name="furnItem"
      data={FURN_PATHS['NEW_TRASH']}
      fill="#ffffff"
      stroke={selectedPath(id, selected_item)}
      strokeWidth={0.5}
    />
  );
}
