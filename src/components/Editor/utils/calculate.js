export function chairs(chairsPerTable, x, y, r) {
  /*
   * @method
   * @description 
   * @param {int} chairsPerTable - 6 || 8
   * @param {int} x - Horizontal center pos of item on screen.
   * @param {int} y - Vertical center pos of item on screen.
   * @param {int} r - Radius length.
   */
  let chairPos = [];
  
  // Calculate angle between chairs
  let angle = Math.floor(360 / chairsPerTable);

  for (var i=0; i < 360; i += angle) {
    let radians = i * Math.PI / 180;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);

    let  in_x = x + (r * 0.8 * cos);
    let  in_y = y + (r * 0.8 * sin);
    let out_x = x + (r * 1.05 * cos);
    let out_y = y + (r * 1.05 * sin);

    chairPos.push([out_x, out_y, i]);
  }
  return chairPos;
}

const chair6 = chairs(6, 250, 250, 20);
const chair8 = chairs(8, 250, 250, 20);