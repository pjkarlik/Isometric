import Cube from './Cube';
import CubeStyle from './Cube2.less';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.grid = 20;
    this.rows = this.grid;
    this.cols = this.grid;
    this.z = 1;
    this.time = 0;
    this.axisY = 0;
    this.axisX = 0;
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
    perspective.className = 'map';
    perspective.id = 'map';
    this.element.appendChild(perspective);
    return perspective;
  }

  generateField() {
    // Generate Cube Field //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10);
    const centerX = (size * this.grid) / 2;
    const centerY = (size * this.grid) / 2;
    const centerZ = (size * this.grid) / 2;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = new Cube(counter,
            centerX - (x * size), centerY - (y * size), centerZ - (r * size), this.perspective, 100, CubeStyle);
          this.cubes.push(cube);
          counter ++;
        }
      }
    }
  }
  changeAngle(e) {
    if (e.keyCode === 38) {
      this.rotation += 10;
      if (this.rotation > 90) {
        // this.rotation = 90;
      }
    }
    if (e.keyCode === 40) {
      this.rotation -= 10;
      if (this.rotation < 0) {
        // this.rotation = 0;
      }
    }
    if (e.keyCode === 37) {
      this.angle += 10;
      if (this.angle > 90) {
        // this.angle = 90;
      }
    }
    if (e.keyCode === 39) {
      this.angle -= 10;
      if (this.angle < 0) {
        // this.angle = 0;
      }
    }
    // if (e.keyCode === 65) {
    //   this.axisY -= 1;
    // }
    // if (e.keyCode === 68) {
    //   this.axisY += 1;
    // }
    // if (e.keyCode === 88) {
    //   this.axisX -= 1;
    // }
    // if (e.keyCode === 87) {
    //   this.axisX += 1;
    // }
    document.getElementById('map').setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  }
  renderLoop() {
    // Loop though Simplex Noise //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10) / 2;
    this.time ++;
    for (let r = 0; r < this.z; r++) {
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
