import CubeStyle from './Cube.less';
import simplexNoise from './simplexNoise';
/** Block Element **/
export default class Cube {
  constructor(index, x, y, z, parent, grid) {
    this.index = index;
    this.y = y;
    this.x = x;
    this.z = z || 0;
    this.grid = grid;
    this.parent = parent;
    this.index = index;
    this.createCube();
    this.updateCube(this.x, this.y, this.z);
  }

  createCube() {
    const cube = document.createElement('div');
    cube.className = CubeStyle.cube;
    cube.id = this.index;
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);`
    );
    this.parent.appendChild(cube);
  }

  updateCube(x, y, z) {
    /* eslint no-param-reassign: 0 */
    const thisX = x / this.grid;
    const thisY = y / this.grid;
    const thisZ = z / this.grid;
    const noise = simplexNoise(thisX, thisY, thisZ);
    const myOpacity = Math.round(255 * noise) * 0.1;
    const cube = document.getElementById(this.index);
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);` +
    `opacity:${myOpacity}`
    );
  }
}
