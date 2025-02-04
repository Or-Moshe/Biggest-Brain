export default class WrongAnswer {
    constructor(scene, x, y) {
      this.scene = scene; // Reference to the Phaser scene
      this.x = x;
      this.y = y;
  
      // Create the big red X
      this.wrongSymbol = this.scene.add.text(this.x, this.y, '❌', {
        fontSize: '200px',
        color: '#ff4c4c',
        fontStyle: 'bold',
      }).setOrigin(0.5);
  
      // Animate the wrong answer (fade out and grow)
      this.animateWrongAnswer();
    }
  
    animateWrongAnswer() {
      this.scene.tweens.add({
        targets: this.wrongSymbol,
        scaleX: 2, // Grow horizontally
        scaleY: 2, // Grow vertically
        alpha: 0,  // Fade out
        duration: 1000, // 1 second
        ease: 'Power1',
        onComplete: () => {
          this.wrongSymbol.destroy(); // Remove the symbol after animation
        },
      });
    }
  }
  