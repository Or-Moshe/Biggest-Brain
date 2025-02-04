import equations  from '../data/Equations';

class CalculationGameCtrl {
  constructor() {
    this.score = 0; // User's score
    this.currentLevel = 1; // Start from level 1
    this.maxLevel = 4; // Maximum level available
    this.currentEquations = [...equations[`level${this.currentLevel}`]]; // Load level 1 equations
  }

  getNextEquation() {
    if (this.currentEquations.length === 0) {
      this.progressLevel(); // Progress to the next level if no equations remain
    }

    return this.currentEquations.shift(); // Return the next equation
  }

  progressLevel() {
    if (this.currentLevel < this.maxLevel) {
      this.currentLevel++;
      this.currentEquations = [...equations[`level${this.currentLevel}`]];
      console.log(`Level Up! Now on Level ${this.currentLevel}`);
    } else {
      console.log("You've reached the maximum level!");
    }
  }

  getScore(){
    return this.score;
  }

  updateScore(correct) {
    if (correct) {
      this.score += 10; // Increase score for a correct answer
    } else {
      this.score -= 5; // Penalize for an incorrect answer
    }

    // Change level based on score thresholds
    if (this.score >= 50 && this.currentLevel < 2) {
      this.progressLevel();
    } else if (this.score >= 100 && this.currentLevel < 3) {
      this.progressLevel();
    } else if (this.score >= 150 && this.currentLevel < 4) {
      this.progressLevel();
    }
  }
}

export default CalculationGameCtrl;
