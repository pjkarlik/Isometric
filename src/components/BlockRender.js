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
    this.angle = 45;
    this.rotation = 65;
    this.blocks = [];
    this.element = element;
    this.message = 'paul j karlik';
    this.perspective = this.createPerspective();

    this.changeAngle = this.changeAngle.bind(this);
    this.updatemessage = this.updatemessage.bind(this);

    document.addEventListener('keydown', this.changeAngle, false);
    this.renderLoop();
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
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
    this.element.appendChild(perspective);
    return perspective;
  }
  updatemessage() {
    this.message = document.getElementById('textinput').value;
    this.renderLoop();
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
    document.getElementById('perspective').setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  }

  renderLoop() {
    const message = this.message.split('').reverse();
    const parent = document.getElementById('perspective');
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    this.blocks = [];
    let holder;
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
            const block = new Block(counter, this.perspective, BlockStyle, currentX - (x * size), (y * size));
            this.blocks.push(block);
          }
          counter ++;
        }
      }
    }
    // window.requestAnimationFrame(this.renderLoop);
  }
}
