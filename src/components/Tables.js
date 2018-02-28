/*
 * Tables.js
 * Table Classes for our editor.
 */

import Konva from 'konva';

// Temp table group
export function make_table(x, y) {

  let groupp = new BaseTable(x, y, 'circle');
  let group = new Konva.Group({
    x: x,
    y: y,
    draggable: true
  });

  let table = new Konva.Circle({
    radius: 20,
    fill: '#dddddd',
    stroke: '#000000',
    strokeWidth: 4
  });

  group.on("dragstart", function () {
    this.moveToTop();
    this.draw();
  });

  group.add(table);
  return group;
}

// Temp canvas click 
export function click_canvas() {
  let position = this.getPointerPosition();
  if (this.getIntersection(position) !== null) return null;

  let new_table = make_table(position.x, position.y);
  console.log(this);

  this.children[0].add(new_table);
  this.draw();
}


export default class BaseTable extends Konva.Group {
  constructor(x, y, table_type) {
    super({
      x: x,
      y: y,
      draggable: true,
      name: table_type
    });
  }
}



export function show_example(stage) {
  var layer = new Konva.Layer();
  var colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  for (var i = 0; i < 6; i++) {
    var box = new Konva.Rect({
      x: i * 30 + 50,
      y: i * 18 + 40,
      fill: colors[i],
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
      width: 100,
      height: 50
    });

    box.on("dragstart", function () {
      this.moveToTop();
      layer.draw();
    });
    box.on("dragmove", function () {
      document.body.style.cursor = "pointer";
    });
    /*
      * dblclick to remove box for desktop app
      * and dbltap to remove box for mobile app
      */
    box.on("dblclick dbltap", function () {
      console.log(this);
      let box_attrs = this.getAttrs();
      let new_w = box_attrs.width * 2;
      let new_h = box_attrs.height * 2;
      this.setAttrs({ 'width': new_w, 'height': new_h });

      //this.destroy();
      layer.draw();
    });
    box.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    box.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    layer.add(box);
  }  

  // add the layer to the stage
  stage.add(layer);
  stage.batchDraw();
}