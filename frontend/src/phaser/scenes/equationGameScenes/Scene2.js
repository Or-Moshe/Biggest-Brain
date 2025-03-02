import Phaser from "phaser";

class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }

    create() {
        this.createBoard();
    }

    createBoard(){
        this.createCube(200, 200, 7);
        this.createCube(300, 200, 8);
        this.createCube(400, 200, 9);

        this.createCube(200, 220, 4);
        this.createCube(300, 220, 5);
        this.createCube(400, 220, 6);

        this.createCube(200, 240, 1);
        this.createCube(280, 240, 2);
        this.createCube(320, 240, 3);

        this.createCube(240, 260, 0);
    }


    createCube(x, y, num){
        const cube = this.add.graphics();
        cube.fillStyle(0x222830); // Green background color
        cube.fillRoundedRect(-40, -40, 80, 80, 10); // Rounded corners
        cube.lineStyle(4, 0xffffff, 1); // White border
        cube.strokeRoundedRect(-40, -40, 80, 80, 10);

              // Create text for the operator
        const numText = this.add.text(0, 0, num, {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);
        // Create a container to hold the graphics and text
        const cubeContainer = this.add.container(x, y);
        cubeContainer.setSize(80, 80);
        cubeContainer.add([cube, numText]);

        return cubeContainer
    }


}
    
    export default Scene2;