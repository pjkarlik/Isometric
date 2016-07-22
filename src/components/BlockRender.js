import Block from './Block';
import BlockStyle from './Block.less';
import getChar from './Alphabet';

/** Parent Render Class */
export default class BlockRender {
  constructor(element) {
    this.width = 20;
    this.height = 5;
    this.rows = 5;
    this.cols = 5;
    this.rotX = 65;
    this.rotY = 0;
    this.rotZ = 115;
    this.time = 0;
    this.blocks = [];
    this.cache = '';
    this.element = element;
    this.message = 'nucleus';
    this.perspective = this.createPerspective();

    this.changeAngle = this.changeAngle.bind(this);
    this.updatemessage = this.updatemessage.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    document.addEventListener('keydown', this.changeAngle, false);
    this.generateMessage();
  }

  createPerspective() {
    const textinput = document.createElement('input');
    textinput.className = 'textinput';
    textinput.id = 'textinput';
    textinput.value = this.message;
    textinput.addEventListener('change', () => { this.updatemessage(); }, false);
    this.element.appendChild(textinput);
    const perspective = document.createElement('div');
    perspective.className = 'perspective';
    perspective.id = 'perspective';
    perspective.setAttribute('style',
      `transform: rotateX(${this.rotX}deg) rotateZ(${this.rotZ}deg) rotateY(${this.rotY}deg)`);
    this.element.appendChild(perspective);
    return perspective;
  }
  updatemessage() {
    window.cancelAnimationFrame(this.renderLoop);
    this.message = document.getElementById('textinput').value;
    this.generateMessage();
  }
  changeAngle(e) {
    switch (e.keyCode) {
      case 38:
        this.rotX += 5;
        break;
      case 40:
        this.rotX -= 5;
        break;
      case 37:
        this.rotZ += 5;
        break;
      case 39:
        this.rotZ -= 5;
        break;
      case 65:
        this.rotY += 5;
        break;
      case 68:
        this.rotY -= 5;
        break;
      default:
        break;
    }
    document.getElementById('perspective').setAttribute('style',
      `transform: rotateX(${this.rotX}deg) rotateZ(${this.rotZ}deg) rotateY(${this.rotY}deg)`);
  }

  generateMessage() {
    const message = this.message.split('').reverse();
    this.cache = message;
    const parent = document.getElementById('perspective');
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    this.blocks = [];
    let holder;
    let myIndex = 0;
    const size = parseInt(BlockStyle.size, 10);
    // Get half the size of the message to center text //
    const offset = (size * 5) * message.length / 2;
    for (let r = 0; r < message.length; r++) {
      holder = getChar(message[r]);
      // Current X for position of Character in message. size * 6 = rows + 1 //
      const currentX = -offset + (size * 6) * r;
      let counter = 0;
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (holder[counter] === 1) {
            myIndex ++;
            const block = new Block(myIndex, this.perspective,
                BlockStyle, currentX - (x * size), (y * size), 0, y);
            this.blocks.push(block);
          }
          counter ++;
        }
      }
    }
    this.renderLoop();
  }

  renderLoop() {
    let myIndex = 0;
    for (let r = 0; r < this.cache.length; r++) {
      const holder = getChar(this.cache[r]);
      this.time += 0.2;
      const cosProp = 55 * Math.sin(((r * 20) + this.time) * Math.PI / 180);
      const sinProp = 55 * Math.cos(((r * 20) + this.time) * Math.PI / 180);
      let counter = 0;
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (holder[counter] === 1) {
            const block = this.blocks[myIndex];
            block.updateCube(sinProp, 0, cosProp);
            myIndex ++;
          }
          counter ++;
        }
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  }
}
