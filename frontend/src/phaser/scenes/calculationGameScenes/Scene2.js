import Phaser from "phaser";
import Clock from '../generics/Clock';
import CorrectAnswer from '../generics/CorrectAnswer';
import WrongAnswer from '../generics/WrongAnswer';
import CalculationGameCtrl from '../../../controllers/CalculationGameCtrl';
import plusImage from '../../assets/plus.jpeg';
import minusImage from '../../assets/minus.png';

class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
        this.operatorCube = null;
        this.operatorCubeColors = {'-': "0x74d5ed", '+': '0xed9074', '*': '0xeddd74', '/': '0x74edac'};
        this.cubeWidth = 50;
        this.cubeHeight = 50;
        this.controller = new CalculationGameCtrl();
        this.equationObj = null;
        this.answerCubeXpos = null;
      }

    preload(){
      this.load.image('plus', plusImage);
      this.load.image('minus', plusImage);
    }
  
    create() {
      this.clock = new Clock(this, 700, 50, 30);

      this.createNumberText(0, 0, `score: ${this.controller.getScore()}`, '32px', '#ffffff');
      this.equationObj = this.controller.getNextEquation();
      this.displayEquation(250, 160, this.equationObj);
      this.displayInteractiveCubes();
    }

    displayEquation(startX, y, { equation }) {
      const spacing = 80;
      const parts = equation.split(' ');
      parts.forEach((part, index) => {
        const xPos = startX + index * spacing;
        if (part === '?') {
          this.answerCubeXpos = xPos;
          // Replace '?' with an empty cube
          this.createCubeContainer(xPos, 150, null);
        } else {
          // Render text for numbers and operators
          this.createNumberText(xPos, y, part, '32px', '#ffffff');
        }
      });
    }

    displayInteractiveCubes(){
      const operators = ['+', '-', '*', '/'];
      const operatorCubes = [];
      const startX = 200; // Starting X position
      const startY = 300; // Y position
      const spacing = 100; // Spacing between cubes
      
      // Loop through operators and create cubes
      operators.forEach((operator, index) => {
        const xPos = startX + index * spacing;
      
        const cubeContainer = this.createCubeContainer(xPos, startY, operator);
        
        cubeContainer.setInteractive();
        // Click event
        cubeContainer.on('pointerdown', () => {
          console.log(`Clicked operator: ${operator}`);
          this.handleOperatorSelection(operator); // Handle click event
        });
      
        // Store in the array for future reference
        operatorCubes.push(cubeContainer);
      });
      
      // Align the cubes horizontally with equal spacing
      Phaser.Actions.AlignTo(operatorCubes, Phaser.Display.Align.RIGHT_CENTER, 20);
    }

    createCubeContainer(x, y, operator) {
      const cube = this.add.graphics();
      cube.fillStyle(this.operatorCubeColors[operator]); // Green background color
      cube.fillRoundedRect(-40, -40, 80, 80, 10); // Rounded corners
      cube.lineStyle(4, 0xffffff, 1); // White border
      cube.strokeRoundedRect(-40, -40, 80, 80, 10);

      // Create text for the operator
      const operatorText = this.add.text(0, 0, operator, {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
      // Create a container to hold the graphics and text
      const cubeContainer = this.add.container(x, y);
      cubeContainer.setSize(80, 80);
      cubeContainer.add([cube, operatorText]);

      return cubeContainer
    }
  
    handleOperatorSelection(selectedOperator) {
      this.createCubeContainer(this.answerCubeXpos, 150, selectedOperator);
      if (selectedOperator === this.equationObj.operator) {
        new CorrectAnswer(this, 400, 300);
        this.controller.updateScore(true);
      } else {
        new WrongAnswer(this, 400, 300);
        this.controller.updateScore(true);
      }
      this.time.delayedCall(500, () => {
        this.scene.restart(); // Restart the scene after the delay
      });
    }

    createNumberText(x, y, text, fontSize, color){
      this.add.text(x, y, `${text}`, {
          fontSize: fontSize,
          color: color,
      });
    }
  }
  
  export default Scene2;
  