/** Blob Class that Sparkles */
export default class Particle {
  constructor(settings, parent, index, style) {
    this.x = settings.startingX;
    this.y = settings.startingY;
    this.z = settings.startingZ;

    this.vx = (Math.random() * 15 - 7) + 1;
    this.vy = (Math.random() * 10 - 5) + 1;
    this.vz = -10;

    this.life = settings.life;
    this.maxLife = settings.maxLife;
    this.particleSize = settings.particleSize;
    this.bounce = settings.bounce;
    this.gravity = settings.gravity;
    this.floor = settings.floor;
    this.index = index;
    this.parent = parent;
    this.style = style;
    this.createCube = this.createCube.bind(this);
    this.update = this.update.bind(this);

    this.createCube();
  }

  createCube() {
    const back = document.createElement('div');
    back.className = this.style.back;
    const cube = document.createElement('div');
    cube.className = this.style.cube;
    cube.id = this.index;
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);`
    );
    cube.appendChild(back);
    this.parent.appendChild(cube);
  }

    // Update Particle Element on Body //
  update() {
    if ((this.z + this.particleSize) < this.floor) {
      this.vy *= this.bounce;
      this.vx *= this.bounce;
      this.vz *= -this.bounce;
      this.z = this.floor + this.particleSize;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.z -= this.vz;
    this.vz += this.gravity;
    this.particleSize -= (this.life * 0.001);
    this.life++;

    const cube = document.getElementById(this.index);
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);` +
    `opacity: ${this.particleSize * 0.1};`
    );
    return {
      size: Math.round(this.particleSize),
      index: this.index,
    };
  }
}
