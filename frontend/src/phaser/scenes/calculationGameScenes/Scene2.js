import Phaser from "phaser";
import Clock from '../generics/Clock';
import CorrectAnswer from '../generics/CorrectAnswer';

class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
        this.num1 = 0;
        this.num2 = 0;
        this.operator = '';
        this.problemSolution = 0;
        this.operatorCube = null;
        this.operatorCubeColors = {'-': "0x74d5ed", '+': '0xed9074', '*': '0xeddd74', '/': '0x74edac'};
        this.cubeWidth = 50;
        this.cubeHeight = 50;
      }
    
      create() {
        this.clock = new Clock(this, 700, 50, 30);
        // Generate a math problem
        this.generateProblem();
    
        // Display the equation
        this.createNumberText(200, 150, this.num1, '32px', '#ffffff');
        this.createCubeWithGraphics(300, 150, null, '0xffffff');
        this.createNumberText(400, 150, this.num2, '32px', '#ffffff');
        this.createNumberText(500, 150, `= ${this.problemSolution}`, '32px', '#ffffff');
    
        Object.keys(this.operatorCubeColors).forEach((op, index) => {
            this.createInteractiveCube(200 + index * 120, 300, op, this.operatorCubeColors[op]);
        })
      }

      createNumberText(x, y, text, fontSize, color){
        this.add.text(x, y, `${text}`, {
            fontSize: '32px',
            color: color,
        });
      }

      createCubeWithGraphics(x, y, text, color) {
        this.operatorCube = this.add.graphics();
        this.operatorCube.fillStyle(color, 1); // Set fill color
        this.operatorCube.lineStyle(5, "0x1f0107", 1); 
        this.operatorCube.strokeRoundedRect(x, y, this.cubeWidth, this.cubeHeight, 10); // Border for rounded rect
        this.operatorCube.fillRoundedRect(x, y, this.cubeWidth, this.cubeHeight, 10); // Draw a 100x100 cube
        
        this.add.text(x + this.cubeWidth / 2, y + this.cubeHeight / 2, text, {
            fontSize: '32px',
            color: '#ffffff',
          }).setOrigin(0.5);
      }

      createInteractiveCube(x, y, operator, color) {
        this.createCubeWithGraphics(x, y, operator, color);
        // Make the cube interactive
        this.operatorCube.setInteractive(new Phaser.Geom.Rectangle(x - 50, y - 50, 100, 100), Phaser.Geom.Rectangle.Contains);
        this.operatorCube.on('pointerdown', () => {
          this.handleOperatorSelection(operator);
        });
      }

    //   showBigCheckmark() {
    //     // Add the big green checkmark
    //     const checkmark = this.add.text(400, 300, '✔', {
    //       fontSize: '200px',
    //       color: '#4caf50',
    //       fontStyle: 'bold',
    //     }).setOrigin(0.5);
    
    //     // Animate the checkmark (grow and fade out)
    //     this.tweens.add({
    //       targets: checkmark,
    //       scaleX: 2, // Grow horizontally
    //       scaleY: 2, // Grow vertically
    //       alpha: 0,  // Fade out
    //       duration: 1000, // 1 second
    //       ease: 'Power1',
    //       onComplete: () => {
    //         checkmark.destroy(); // Remove checkmark after animation
    //       },
    //     });
    //   }
    
    
      generateProblem() {
        this.num1 = Phaser.Math.Between(1, 10);
        this.num2 = Phaser.Math.Between(1, 10);
        this.operator = Phaser.Math.RND.pick(['+', '-', '*']); // Random operator
        this.problemSolution = eval(`${this.num1} ${this.operator} ${this.num2}`);
      }
    
      handleOperatorSelection(selectedOperator) {
        this.createCubeWithGraphics(300, 150, selectedOperator, this.operatorCubeColors[selectedOperator]);
        // if (selectedOperator === this.operator) {
        //   console.log('Correct!');
          
        //   this.scene.restart();
        //    // Restart the scene for a new problem
        // } else {
        //   console.log('Wrong operator. Try again!');
        // }
        setTimeout(new CorrectAnswer(this, 400, 300), 2000);
        this.scene.restart();
      }
    }
  
  export default Scene2;
  