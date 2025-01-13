
export default class CorrectAnswer{

  constructor(scene, x, y) {
    this.scene = scene; // Reference to the Phaser scene
    this.x = x;
    this.y = y;

    // Create the big green checkmark
    this.checkmark = this.scene.add.text(this.x, this.y, '✔', {
      fontSize: '200px',
      color: '#4caf50',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Start animation
    this.animateCheckmark();
  }

  animateCheckmark() {
    this.scene.tweens.add({
      targets: this.checkmark,
      scaleX: 2, // Grow horizontally
      scaleY: 2, // Grow vertically
      alpha: 0,  // Fade out
      duration: 1000, // 1 second
      ease: 'Power1',
      onComplete: () => {
        this.checkmark.destroy(); // Remove the checkmark after animation
      },
    });
  }
}