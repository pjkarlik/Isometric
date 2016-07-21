/** Block Element **/
export default class Block {
  constructor(index, parent, style, y, x, z) {
    this.y = y;
    this.x = x;
    this.z = z || 0;
    this.style = style;
    this.parent = parent;
    this.index = `block${index}`;
    this.createCube = this.createCube.bind(this);
    this.updateCube = this.updateCube.bind(this);
    this.createCube();
  }

  createCube() {
    const back = document.createElement('div');
    back.className = this.style.back;
    const cube = document.createElement('div');
    cube.className = this.style.cube;
    cube.id = this.index;
    cube.setAttribute('style', `transform: translate3D(${this.z}px, ${this.y}px, ${this.x}px)`);
    cube.appendChild(back);
    this.parent.appendChild(cube);
  }

  updateCube(x, y, z) {
    const cube = document.getElementById(this.index);
    cube.setAttribute('style', `transform: translate3D(${this.z + z}px, ${this.y + y}px, ${this.x + x}px)`);
  }
}
