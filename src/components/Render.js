import Block from './Block';
import BlockStyle from './Block.less';
import getChar from './Alphabet';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.width = 20;
    this.height = 5;
    this.rows = 5;
    this.cols = 5;
    this.blocks = [];
    this.element = element;
    this.message = 'paul j karlik';
    this.perspective = this.createPerspective();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement('div');
    perspective.className = 'perspective';
    this.element.appendChild(perspective);
    return perspective;
  }

  renderLoop() {
    const message = this.message.split('').reverse();
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
            const block = new Block(counter, currentX - (x * size), (y * size), this.perspective);
            this.blocks.push(block);
          }
          counter ++;
        }
      }
    }
    // window.requestAnimationFrame(this.renderLoop);
  }
}
