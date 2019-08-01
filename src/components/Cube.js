export default class Cube {
  constructor(index, x, y, z, parent, grid, style, scale) {
    this.index = index;
    this.y = y || 0;
    this.x = x || 0;
    this.z = z || 0;
    this.grid = grid;
    this.parent = parent;
    this.index = index;
    this.style = style;
    this.scale = scale || 1;
    this.createCube();
    this.updateCube(this.x, this.y, this.z);
  }

  createCube() {
    const back = document.createElement("div");
    back.className = this.style.back;
    const cube = document.createElement("div");
    cube.className = this.style.cube;
    cube.id = this.index;
    cube.setAttribute(
      "style",
      `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);`
    );
    cube.appendChild(back);
    this.parent.appendChild(cube);
  }

  updateCube(x, y, z, opacity, scale) {
    const cube = document.getElementById(this.index);
    cube.setAttribute(
      "style",
      `transform: translate3D(${x}px, ${y}px, ${z}px) ` +
        `scaleX(${scale}) scaleY(${scale}) scaleZ(${scale});` +
        `opacity:${opacity};`
    );
  }
}
