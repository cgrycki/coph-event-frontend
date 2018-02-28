/*
 * Tables.js
 * Table Classes for our editor.
 */

import Konva from 'konva';

class TableBase extends Konva.Node() {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.draggable = true;
    this.visible = true;
  }
}