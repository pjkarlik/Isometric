import Particle from './Particle';
import CubeStyle from './Cube3.less';
/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.angle = 45;
    this.rotation = 65;
    this.particles = [];
    this.sizedPartiles = [];
    this.bufferCache = {};
    this.counter = 0;
    this.settings = {
      density: 20,
      life: 0,
      maxLife: 100,
      bounce: 0.65,
      gravity: 0.25,
      floor: 0,
      particleSize: parseInt(CubeStyle.size, 10),
      startingX: 0,
      startingY: 0,
      startingZ: 250,
    };

    this.element = element;
    this.perspective = this.createPerspective();
    this.renderLoop = this.renderLoop.bind(this);
    this.createParticle = this.createParticle.bind(this);
    this.changeAngle = this.changeAngle.bind(this);
    document.addEventListener('keydown', this.changeAngle, false);
    this.createParticle();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement('div');
    perspective.className = 'map';
    perspective.id = 'container';
    perspective.setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
    this.element.appendChild(perspective);
    return perspective;
  }

  createParticle() {
    for (let i = 0; i < this.settings.density; i++) {
      if (Math.random() > 0.99) {
        const particle = new Particle(this.settings, this.perspective, this.counter, CubeStyle);
        this.particles.push(particle);
        this.counter ++;
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
  }

  renderLoop() {
    this.createParticle();
    for (let i = 0; i < this.particles.length; i++) {
      const ptz = this.particles[i];
      const cpt = ptz.update();
      if (cpt.size < 0) {
        const cube = document.getElementById(cpt.index);
        cube.remove();
        this.particles.splice(i, 1);
      }
    }
    document.getElementById('container').setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg);`);
    window.requestAnimationFrame(this.renderLoop);
  }
}
