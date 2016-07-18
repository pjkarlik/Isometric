import Cube from './Cube';
import CubeStyle from './Cube.less';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.grid = 10;
    this.rows = this.grid;
    this.cols = this.grid;
    this.z = this.grid;
    this.time = 0;
    this.angle = 45;
    this.rotation = 65;
    this.cubes = [];
    this.element = element;
    this.perspective = this.createPerspective();
    this.renderLoop = this.renderLoop.bind(this);
    this.generateField = this.generateField.bind(this);
    this.changeAngle = this.changeAngle.bind(this);
    document.addEventListener('keydown', this.changeAngle, false);
    this.generateField();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement('div');
    perspective.className = 'container';
    perspective.id = 'container';
    this.element.appendChild(perspective);
    return perspective;
  }

  generateField() {
    // Generate Cube Field //
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
  changeAngle(e) {
    if (e.keyCode === 38) {
      this.rotation += 10;
      if (this.rotation > 85) {
        this.rotation = 85;
      }
    }
    if (e.keyCode === 40) {
      this.rotation -= 10;
      if (this.rotation < 5) {
        this.rotation = 5;
      }
    }
    if (e.keyCode === 37) {
      this.angle += 10;
      if (this.angle > 85) {
        this.angle = 85;
      }
    }
    if (e.keyCode === 39) {
      this.angle -= 10;
      if (this.angle < 5) {
        this.angle = 5;
      }
    }
    document.getElementById('container').setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  }
  renderLoop() {
    // Loop though Simplex Noise //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10) / 2;
    for (let r = 0; r < this.z; r++) {
      this.time += 1;
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = this.cubes[counter];
          cube.updateCube((x * size), (y * size), (r * size) - this.time);
          counter ++;
        }
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  }
}
