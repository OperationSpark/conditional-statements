#!/usr/bin/env node

var view = require("./view");

console.log('Welcome to Operation Spark\'s Guessing Game!');

var _maxTurns;
var _turns;
var _answer;

var mainMenu;
var gamePrompt;

mainMenu = view.makeMenu("(s) Start game, (q) quit", /^[sq]$/);
mainMenu.on('userInput', onMainMenuInput);
mainMenu.show();

function onMainMenuInput(input) {
    // TODO 1 : Create a switch case to process the main menu input //
    switch (input) {
        case 'q':
            console.log('Thanks for playing Operation Spark\'s guessing game! Bye bye!');
            process.exit(0);
            break;
        case 's':
            start(7);
            break;
    }
}

function start(maxTurns) {
    _maxTurns = (maxTurns) ? maxTurns : 7;
    _turns = [];
    
    // TODO 2 : generate a random number between 0 and 100 //
    _answer = Math.floor(101 * Math.random());
    
    console.log('We selected a number between 0 and 100.');
    console.log('You have a limited number of turns to guess the correct answer. Go...');
    
    gamePrompt = view.makeMenu("Guess", /^[0-9][0-9]?$|^100$/);
    gamePrompt.on('userInput', onGamePromptInput);
    gamePrompt.show();
}

function onGamePromptInput(input) {
    /*
     * Ensure we have a value of type Number
     */
    input = parseInt(input, 10);
    
    // TODO 3 : use if ...else-if ...else to process the game prompt input //
    var feedback;
    if (input === _answer) {
        console.log('Bingo, you guessed it, the answer is %d.  GAME OVER!', _answer);
        return endGame();
    } else if (input > _answer) {
        feedback = 'Lower...';
    } else {
        feedback = 'Higher...';
    }
    
    // TODO 4: use if ...else to do next turn only if there's a remaining turn //
    if (_turns.push(input) < _maxTurns) {
        doNextTurn(input, feedback);
    } else {
        console.log('You\'ve reached the maximum number of turns: GAME OVER!');
        endGame();
    }
}

function doNextTurn(input, tip) {
    console.log(tip);
    gamePrompt.show();
}

function endGame() {
    console.log('The correct answer was %d', _answer);
    console.log('You guessed %s', _turns.toString());
    mainMenu.show();
}