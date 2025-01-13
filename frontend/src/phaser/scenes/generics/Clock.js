import Phaser from "phaser";

export default class Clock {
    constructor(scene, x, y, initialTime = 30, radius = 50) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.initialTime = initialTime;
      this.timeLeft = initialTime;
      this.radius = radius;
  
      // Create a graphics object for the circle
      this.circle = this.scene.add.graphics();
      this.drawCircle();
  
      // Create the text for the remaining time
      this.timerText = this.scene.add.text(this.x, this.y, `${this.timeLeft}`, {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Start the countdown
      this.startCountdown();
    }
  
    drawCircle() {
      this.circle.clear();
      this.circle.lineStyle(6, 0xffe066, 1); // Set circle border color and thickness
      this.circle.strokeCircle(this.x, this.y, this.radius); // Draw the circle
    }
  
    startCountdown() {
      this.scene.time.addEvent({
        delay: 1000, // 1 second interval
        callback: this.updateTimer,
        callbackScope: this,
        loop: true, // Continue until time is up
      });
    }
  
    updateTimer() {
      this.timeLeft -= 1; // Decrement time
      this.timerText.setText(`${this.timeLeft}`); // Update the displayed time
  
      // Optional: Change the circle color as time progresses
      const color = Phaser.Display.Color.Interpolate.ColorWithColor(
        { r: 255, g: 100, b: 100 }, // Red
        { r: 100, g: 255, b: 100 }, // Green
        this.initialTime,
        this.timeLeft
      );
      const hexColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
  
      this.circle.lineStyle(6, hexColor, 1); // Update circle color
      this.circle.strokeCircle(this.x, this.y, this.radius);
  
      // Handle when time is up
      if (this.timeLeft <= 0) {
        this.timerText.setText('0');
        this.handleTimeUp();
      }
    }
  
    handleTimeUp() {
      console.log('Time’s up!');
      this.scene.scene.restart(); // Restart the scene
    }
  }
  