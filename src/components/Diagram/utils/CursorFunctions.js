export default class CursorFunctions {
  static getEventType(event) {
    return event.type;
  }

  static setCursor(stage, style) {
    const container = stage.container();
    container.style.cursor = style;
  }

  static handleMouseDown(stage, event) {
    const eventTarget = event.target;
    const name = eventTarget.getAttr('name');

    if (name === 'FloorGood') this.setCursor(stage, 'move');
    //if (name === 'FurnItem') this.setCursor(stage, 'pointer');
  }

  static handleMouseUp(stage, event) {
    const eventTarget = event.target;
    const name = eventTarget.getAttr('name');

    console.log(event, 'mouseup', name);

    // Just clicked on the floor, about to add item
    if (name === 'FloorGood') this.setCursor(stage, 'move');

    // Just got done dragging
    if (name === 'furnItem') this.setCursor(stage, 'pointer');
  }

  static handleEvents(canvasRef, event) {

    const stage = canvasRef.getStage();
    const eventType = this.getEventType(event);

    // Selecting, moving, or deleting
    if (eventType === 'mousedown') this.handleMouseDown(stage, event);
    if (eventType === 'mouseup')   this.handleMouseUp(stage, event);
    if (eventType === 'dragstart') this.setCursor(stage, 'move');
    if (eventType === 'dragend')   this.setCursor(stage, 'grab');

  }
}