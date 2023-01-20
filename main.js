const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._isPlaying = true;
    this._y = 0;
    this._x = 0;
  };
  
  print() {
    return this._field.map((row) => row.join("")).join("\n");
  };

  askMove() {
    let move = prompt("Which way? (u = Up, d = Down, l = Left, and r = Right)");
    switch (move.toLowerCase()) {
      case "u":
        console.log("Moving up");
        this._y -= 1;
        break;
      case "d":
        console.log("Moving down");
        this._y += 1;
        break;
      case "l":
        console.log("Moving left");
        this._x -= 1;
        break;
      case "r":
        console.log("Moving right");
        this._x += 1;
        break;
      default:
        console.log('Error! Please type correct direction!');
        this.askMove();
        break;
    }
  };

  checkWin() {
    if (this._field[this._y][this._x] === 'undefined') {
      console.log("You lose - Out of boundary");
    };
    switch (this._field[this._y][this._x]) {
      case hole:
        console.log("You lose - You fell in a hole!");
        this._isPlaying = false;
        break;
      case undefined:
        console.log("You lose - Out of boundary");
        this._isPlaying = false;
        break;
      case hat:
        console.log("You win - You found the hat!");
        this._isPlaying = false;
        this.askAgain();
        break;
      case fieldCharacter:
        console.log("Keep looking for the hat...");
        this._field[this._y][this._x] = pathCharacter;
        break;
      case pathCharacter:
        console.log("You are stepping on *");
        break;
    };
  };

  askAgain() {
    let askAgain = prompt('......\nDo you play again? To play again type \'y\'or type \'n\'to quit. If you want a tougher challenge type \'t\'.');
    switch(askAgain.toLowerCase()) {
      case 'y':
        this._isPlaying = true;
        console.log('Starting game!');
        myField = new Field(Field.generateField(5, 6, 20));
        game(); 
        break;
      case 't':
        this._isPlaying = true;
        console.log('\n\nStarting difficult level!');
        myField = new Field(Field.generateField(9 ,8 ,40));
        game(); 
        break;
      case 'n':
        this._isPlaying = false;
        console.log('Thank you for playing the game! GoodBye!');
        break;
      default:
        console.log('\nPlease type y or n.')
        break;
    }
  };

  static generateField(width, height, percentage) {
    const setHoleOrField = (percentage) => {
      if (0 <= percentage && percentage <= 100) {
        const ranNum = Math.random() * 100;
        if (ranNum < percentage) {
          return hole;
        } else {
          return fieldCharacter;
        }
      } else {
        console.log("Please enter a number between 0 - 100");
      }
    };

    const plainField = () => {
      function makeWidth() {
        let widthArray = [];
        for (let i = 0; i < width; i++) {
          widthArray.push(setHoleOrField(percentage));
        }
        return widthArray;
      }
      let plainField = [];
      for (let i = 0; i < height; i++) {
        plainField.push(makeWidth());
      }
      return plainField;
    };

    const gameReadyField = plainField();

    do {
      gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
     } while (gameReadyField[0][0] == hat);

    gameReadyField[0][0] = pathCharacter;

    return gameReadyField;
  }
};

let myField = new Field(Field.generateField(7, 8, 14));

function game() {
  console.log("Find Your Hat!");
  while (myField._isPlaying) {
    console.log(myField.print());
    myField.askMove();
    myField.checkWin();
  }
  console.log("Game Over Man!");
};

game();