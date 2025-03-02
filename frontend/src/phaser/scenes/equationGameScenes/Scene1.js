
import Phaser from "phaser";

class Scene1 extends Phaser.Scene {
  constructor() {
    super('Scene1');
  }

  preload() {
    //this.load.image('logo', 'path/to/logo.png');
  }

  create() {
    this.scene.start('Scene2');
  }
}

export default Scene1;

  