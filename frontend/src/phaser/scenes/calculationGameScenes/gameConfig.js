import Phaser from "phaser";
import Scene1 from './Scene1';
import Scene2 from './Scene2';

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene1, Scene2],
  parent: 'phaser-game', // Attach to React component
  backgroundColor: '#999999',
};

export default gameConfig;
