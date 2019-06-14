// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};


// replace this comment with your four ghosts setup as objects
ghosts = [inky, blinky, pinky, clyde]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`\nPellets: ${powerPellets}`);
}

// Use the array of ghosts you setup in the previous step to cycle through and display each ghost.
function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');

  for(i=0; i < ghosts.length; i++){
    console.log(`(${i+1}) Eat ${ghosts[i].name} (${ghosts[i].edible? "Edible": "Not Edible"})`); 
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

// add a function called eatGhost that accepts a ghost as an argument
// the eatGhost should check to see if a ghost is edible. If it's not, Pac-Man should lose a life
// include a quick sentence that says the name and colour of the ghost that kills Pac-Man (similar to how it quickly flashes chomp on the screen when you eat a dot)

function eatGhost(ghost){
  if (ghost.edible == false){
      lives -= 1;     
    console.log(`\n${ghost.name} that has ${ghost.colour} colour just killed you bro`)
  } else if (
    ghost.edible == true
    ){
    console.log(`I just ate ${ghost.name} that are ${ghost.character}.`);
    score += 200;
    ghost.edible = false;   
  }
}

// Create an eatPowerPellet function that's executed when the p key is entered. It should:

// increase Pac-Man's score by 50 points
// change all the ghost's edible property to true
// reduce the number of Power-Pellets remaining

function eatPowerPellet(){
  for (i=0; i < ghosts.length; i++){
    ghosts[i].edible = true;
  }
  score += 50;
  powerPellets -= 1;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
         eatPowerPellet();
         break;
      } else{
        console.log('\n no more left power pellets left!');
        break;
      }
       
    case '1':
      eatGhost(inky);
      gameover();
      break;
    case '2':
      eatGhost(blinky);
      gameover();
      break;
    case '3':
      eatGhost(pinky);
      gameover();
      break;
    case '4':
      eatGhost(clyde);
      gameover();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

// If Pac-Man's lives go below 0, it's Game Over and you should exit the game. Create a function that checks for this every time Pac-Man loses a life, and calls process.exit(); if necessary.

function gameover(){
  if (lives < 0){ 
    process.exit();
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {

  console.log('\n\nGame Over!\n');
  
});
