import BlockStyle from './Block.less';
/** Block Element **/
export default class Block {
  constructor(index, top, left, parent, z) {
    this.index = index;
    this.top = top;
    this.left = left;
    this.z = z || 0;
    this.parent = parent;
    this.index = index;
    this.createCube();
  }

  createCube() {
    const cube = document.createElement('div');
    cube.className = BlockStyle.cube;
    cube.id = `block${this.index}`;
    cube.setAttribute('style', `transform: translate3D(${this.z}px, ${this.top}px, ${this.left}px)`);
    this.parent.appendChild(cube);
  }

  updateCube() {
  }
}
