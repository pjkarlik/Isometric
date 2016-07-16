import Block from './Block';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.width = 10;
    this.height = 10;
    this.blocks = [];
    this.element = element;
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
    let counter = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const block = new Block(counter, x * 20, y * 20, this.perspective);
        this.blocks.push(block);
        counter ++;
      }
    }
    // window.requestAnimationFrame(this.renderLoop);
  }
}
