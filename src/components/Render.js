import Cube from "./Cube";
import CubeStyle from "./Cube2.less";
import simplexNoise, { fastfloor } from "./simplexNoise";

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.grid = 12;
    this.dec = 15;
    this.rows = this.grid;
    this.cols = this.grid;
    this.z = Math.abs(this.grid / 4);
    this.time = 0;
    this.angle = 45;
    this.rotation = 65;
    this.style = CubeStyle;
    this.cubes = [];
    this.element = element;
    this.perspective = this.createPerspective();
    this.renderLoop = this.renderLoop.bind(this);
    this.generateField = this.generateField.bind(this);
    this.changeAngle = this.changeAngle.bind(this);
    document.addEventListener("keydown", this.changeAngle, false);
    this.generateField();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement("div");
    perspective.className = "container";
    perspective.id = "container";
    perspective.setAttribute(
      "style",
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`
    );
    this.element.appendChild(perspective);
    return perspective;
  }

  generateField() {
    // Generate Cube Field //
    let counter = 0;
    const size = parseInt(this.style.size, 10);
    const centerX = (size * this.grid) / 2;
    const centerY = (size * this.grid) / 2;
    const centerZ = (size * this.grid) / 2;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = new Cube(
            counter,
            centerX - x * size,
            centerY - y * size,
            centerZ - r * size,
            this.perspective,
            this.dec,
            this.style
          );
          this.cubes.push(cube);
          counter++;
        }
      }
    }
  }
  changeAngle(e) {
    switch (e.keyCode) {
      case 38:
        this.rotation += 5;
        break;
      case 40:
        this.rotation -= 5;
        break;
      case 37:
        this.angle += 5;
        break;
      case 39:
        this.angle -= 5;
        break;
      default:
        break;
    }
    // document.getElementById('container').setAttribute('style',
    //   `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  }

  renderLoop() {
    // Loop though Simplex Noise //
    let counter = 0;
    const size = parseInt(this.style.size, 10) / 2;
    this.time += 0.02;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = this.cubes[counter];
          const thisX = x / this.dec;
          const thisY = y / this.dec;
          const thisZ = r / this.dec;
          const noise = simplexNoise(thisX, thisY, thisZ + this.time);
          const myOpacity = fastfloor(255 * noise);
          cube.updateCube(x * size, y * size, r * size, myOpacity);
          counter++;
        }
      }
    }
    document
      .getElementById("container")
      .setAttribute(
        "style",
        `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`
      );
    window.requestAnimationFrame(this.renderLoop);
  }
}
