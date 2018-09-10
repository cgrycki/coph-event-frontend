

// Fixed canvas 'Stage; size
const STG_BASE_WIDTH = 960;
const STG_BASE_HEIGHT = 500;

// Max size
const FP_BASE_WIDTH = 1920;
const FP_BASE_HEIGHT = 1500;





export default class ScaleUtils {
  static computeScale(dimensions) {
    const scaleX = Math.min(dimensions.width, FP_BASE_WIDTH) / STG_BASE_WIDTH;
    const scaleY = Math.min(dimensions.height, FP_BASE_HEIGHT) / STG_BASE_HEIGHT;
    
    const minRatio = Math.min(scaleX, scaleY);
    return {x: minRatio, y: minRatio};
  }

  static resizeStageToContainer(canvasRef) {
    const stage = canvasRef.getStage();
    const container = stage.getContainer();
    let containerSize = {
      width: container.clientWidth,
      height: container.clientHeight
    };

    // Odd size can cause blur due to pixel rendering
    if (containerSize.width % 2 !== 0) containerSize.width--;
    if (containerSize.height % 2 !== 0) containerSize.height--;

    // Resize stage
    this.sizeStage(stage, containerSize);

    // Scale
    this.scaleStage(stage, containerSize);

    // Center
    this.centerStage(stage, containerSize);

    // Redraw
    stage.batchDraw();
  }

  static sizeStage(stage, dimensions) {
    stage.resize(dimensions);
  }

  static scaleStage(stage, dimensions) {
    const scale = this.computeScale(dimensions);
    stage.scale(scale);
  }

  static centerStage(stage, dimensions) {
    const scale = this.computeScale(dimensions);
    const stagePos = {
      x: (dimensions.width - STG_BASE_WIDTH * scale.x) * 0.5,
      y: (dimensions.height - STG_BASE_HEIGHT * scale.y) * 0.5
    };

    stage.position(stagePos);
  }

  static ptToAbsolute(stage, pt) {
    return {
      x: stage.x() + pt.x * stage.scaleX(),
      y: stage.y() + pt.y * stage.scaleY()
    };
  }

  static ptFromAbsolute(stage, pt) {
    let newPos = {x: 0, y: 0};
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    if (scaleX !== 0) newPos.x = (pt.x - stage.x()) / scaleX;
    if (scaleY !== 0) newPos.y = (pt.y - stage.y()) / scaleY;

    return newPos;
  }
}