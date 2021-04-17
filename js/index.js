// -------------------------------------
// CONSTANTS
// -------------------------------------
const bottleWidth = 50;
const bottleHeight = 180;
const bottleAjustment = bottleWidth / 2;
const bottleLayoutPositionY = 320;

// -------------------------------------
// GLOBAL VARIABLES
// -------------------------------------
let bottle;
let pressedBottle;
let spacing;
let columns;
let gameToDraw;
let game;
let takeout;
let drawTakeOut;
let backgroundColor;

// -------------------------------------
// FUNCTIONS
// -------------------------------------
function setup() {

    createCanvas(1280, 720);
    game = new Game();
    game.loadLevel(game.levelOneA);
    bottle = loadImage('images/bottle.png');
    pressedBottle = loadImage('images/pressed_bottle.png');
    gameToDraw = game.currentGame;
    columns = gameToDraw.length + 1;
    spacing = 1280 / columns;
    backgroundColor = 'black';
    frameRate(30);

}

function draw() {

    background(backgroundColor);

    fill(255, 255, 255);

    // Draw the game.
    gameToDraw = game.currentGame;

    //Draw bottles
    for (let i = 0; i < game.currentBottlesState.length; i++) {
        let x = spacing * (i + 1) - bottleAjustment;

        if (game.currentBottlesState[i])
            image(pressedBottle, x, bottleLayoutPositionY);
        else
            image(bottle, x, bottleLayoutPositionY);

        bottle.resize(bottleWidth, 0);
        pressedBottle.resize(bottleWidth, 0);



    }

    //Draw the balls
    for (let i = 0; i < gameToDraw.length; i++) {

        let x = spacing * (i + 1);
        let currentStack = gameToDraw[i];
        let tempStack = new Stack();
        let preStack = new Stack();
        let postStack = new Stack();
        let height = 1;

        while (currentStack.size() > 0) {
            preStack.push(currentStack.pop());
        }

        while (preStack.size() > 0) {

            let currentBall = preStack.pop();
            fill(color(getColor(currentBall)));
            ellipse(x, 500 - (height * 20), 20, 20);
            height++;
            postStack.push(currentBall);
        }

        while (postStack.size() > 0) {
            tempStack.push(postStack.pop());
        }

        while (tempStack.size() > 0) {
            currentStack.push(tempStack.pop());
        }

    }

    //Draw takeout balls
    if (drawTakeOut) {


        let fillColor = game.takeout[0];
        let howMany = game.takeout[1];

        console.log(color + " " + howMany);
        let counter = 0;
        while (counter < howMany) {

            fill(color(getColor(fillColor)));
            ellipse(spacing * (game.takeout[2] + 1), 280 - (counter * 20), 20, 20);
            counter++;
        }
    }

}

//Get color hexacode from string.
function getColor(color) {

    let colorToFill;

    switch (color) {
        case 'blue':
            colorToFill = '#04d9ff';
            break;

        case 'yellow':
            colorToFill = '#ffff00';
            break;

        case 'red':
            colorToFill = '#ff0000';
            break;
    }

    return colorToFill;

}

function mousePressed() {

    //Calculate bottles area.
    let counter = 1;

    while (counter <= columns - 1) {

        let x1 = spacing * (counter) - bottleAjustment;
        let x2 = x1 + (2 * bottleAjustment);
        let y1 = bottleLayoutPositionY;
        let y2 = bottleLayoutPositionY + bottleHeight;

        if (mouseY > y1 && mouseY < y2) {
            if (mouseX > x1 && mouseX < x2) {

                if (!drawTakeOut) {

                    if (!game.currentBottlesState[counter - 1]) {

                        game.currentBottlesState[counter - 1] = true;
                        game.takeout = game.currentGame[counter - 1].takeout(counter - 1);
                        drawTakeOut = true;
                        console.log(game.currentBottlesState[counter - 1]);
                        return false;

                    } else {

                        for (let i = 0; i < game.currentBottlesState.length; i++) {
                            if (i != (counter - 1))
                                game.currentBottlesState[i] = false;
                        }
                        return false;

                    }

                } else {

                    let bottleStack = game.currentGame[counter - 1];
                    if ((bottleStack.size() - game.takeout[1]) >= 0 || bottleStack.size() == 0) {
                        if (bottleStack.peek() === 'empty' || bottleStack.peek() === game.takeout[0]) {

                            counter = 0;
                            while (counter < game.takeout[1]) {

                                bottleStack.push(game.takeout[0]);
                                counter++;

                            }

                            drawTakeOut = false;

                            for (let i = 0; i < game.currentBottlesState.length; i++) {
                                game.currentBottlesState[i] = false;
                            }

                            backgroundColor = 'green';
                            setTimeout(function() {
                                backgroundColor = 'black';
                            }, 100);

                            return false;

                        }
                    }




                    backgroundColor = 'red';
                    setTimeout(function() {
                        backgroundColor = 'black';
                    }, 100);

                    return false;
                }



            }
        }

        counter++;
    }

    //Pressed bottle.
    for (let i = 0; i < game.currentBottlesState.length; i++) {
        game.currentBottlesState[i] = false;
    }

    //Put back took out balls.

    if (drawTakeOut) {
        let tookOutBalls = game.takeout;
        counter = 0;
        let stack = gameToDraw[tookOutBalls[2]];

        while (counter < tookOutBalls[1]) {

            stack.push(tookOutBalls[0]);
            counter++;

        }

        drawTakeOut = false;
    }


    return false;
}