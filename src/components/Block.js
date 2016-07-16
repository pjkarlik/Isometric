import BlockStyle from './Block.less';
/** Block Element **/
export default class Block {
  constructor(index, top, left, parent) {
    this.index = index;
    this.top = top;
    this.left = left;
    this.parent = parent;
    this.index = index;
    this.createCube();
  }

  createCube() {
    const cube = document.createElement('div');
    cube.className = BlockStyle.cube;
    cube.id = this.index;
    cube.setAttribute('style', `transform: translate3D(0px, ${this.top}px, ${this.left}px)`);
    this.parent.appendChild(cube);
  }

  updateCube() {
  }
}
