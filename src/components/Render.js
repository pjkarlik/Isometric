import Cube from './Cube';
import CubeStyle from './Cube.less';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.grid = 15;
    this.rows = this.grid;
    this.cols = this.grid;
    this.z = this.grid;
    this.time = 0;
    this.cubes = [];
    this.element = element;
    this.perspective = this.createPerspective();
    this.renderLoop = this.renderLoop.bind(this);
    this.generateField();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement('div');
    perspective.className = 'container';
    this.element.appendChild(perspective);
    return perspective;
  }

  generateField() {
    // Get half the size of the message to center text //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10);
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = new Cube(counter, (x * size), (y * size), (r * size), this.perspective, 100);
          this.cubes.push(cube);
          counter ++;
        }
      }
    }
  }

  renderLoop() {
    // Get half the size of the message to center text //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10);
    for (let r = 0; r < this.z; r++) {
      this.time += 1;
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = this.cubes[counter];
          cube.updateCube((x * size), (y * size) + this.time, (r * size));
          counter ++;
        }
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  }
}
