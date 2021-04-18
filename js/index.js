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

//-----------Will
let screen;
let uitour;
let soundBtn;

var dakiti;

let menuBg;
let musicOn;

let inst1Bg;
let inst2Bg;
let inst3Bg;
let inst4;
let inst5;
let inst6;
let game1;
let game2;
//-----------Will


// -------------------------------------
// FUNCTIONS
// -------------------------------------

function preload() {
    dakiti = loadSound("sound/dakiti.mp3");
}


function setup() {

    createCanvas(1280, 720);
    screen = 0;
    uitour = 0;
    soundBtn = true;
    dakiti.play();
    dakiti.setVolume(0.05);
    game = new Game();
    game.loadLevel(game.levelOneA);
    game.starTime();
    bottle = loadImage('images/bottle.png');
    pressedBottle = loadImage('images/pressed_bottle.png');

    //----------Will
    menuBg = loadImage('images/menu-inst/menubg.png');
    inst1Bg = loadImage('images/menu-inst/inst1bg.png');
    inst2Bg = loadImage('images/menu-inst/inst2bg.png');
    inst3Bg = loadImage('images/menu-inst/inst3bg.png');
    inst4 = loadImage('images/menu-inst/inst4.png');
    inst5 = loadImage('images/menu-inst/inst5.png');
    inst6 = loadImage('images/menu-inst/inst6.png');
    game1 = loadImage('images/menu-inst/game1.png');
    game2 = loadImage('images/menu-inst/game2.png');

    musicOn = loadImage('images/ui/musicon.png');
    //----------Will
    gameToDraw = game.currentGame;
    columns = gameToDraw.length + 1;
    spacing = 1280 / columns;
    backgroundColor = 'black';
    frameRate(30);

}

function draw() {

    switch (screen) {
        case 0:
            image(menuBg, 0, 0);
            if (soundBtn == true) {
                image(musicOn, 0, 0);   
            }
            
            break;
        case 1:
            image(inst1Bg, 0, 0);
            break;
        case 2:
            image(inst2Bg, 0, 0);
            break;
        case 3:
            image(inst3Bg, 0, 0);
            break;
        case 4:
            switch (uitour) {
                case 0:
                    image(inst4, 0, 0);
                    break;

                case 1:
                    image(inst5, 0, 0);
                    break;

                case 2:
                    image(inst6, 0, 0);
                    break;
            }
            break;
        case 5:
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


            //Draw time
            fill(255, 255, 255)
            textSize(36);
            text(game.getTime(), 140, 100);
            text(game.movements, 140, 150);


            if (game.finished) {
                background('');
            }
            break;
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

//-------Navegacion temporal Will
function keyPressed() {
    if (key == 'd') {
        screen++;
    } else if (key == 'a') {
        screen--;
    }
}
//-------Navegacion temporal Will



function mousePressed() {

    //-------Navegacion temporal con el mouse Will
    switch (screen) {
        case 0:
            if ((mouseX > 555 && mouseX < 732) && (mouseY > 413 && mouseY < 473)) {
                screen = 1;
            }
            if ((mouseX > 1090 && mouseX < 1200) && (mouseY > 80 && mouseY < 173)) {
                soundBtn = !soundBtn;
                if(soundBtn==true){
                    dakiti.play();
                } else if(soundBtn==false){
                    dakiti.stop();
                }
            }

            break;

        case 1:
            if ((mouseX > 287 && mouseX < 512) && (mouseY > 493 && mouseY < 555)) {

                screen = 2;
            }
            break;

        case 2:
            if ((mouseX > 333 && mouseX < 558) && (mouseY > 493 && mouseY < 555)) {
                screen = 3;
            }
            if ((mouseX > 80 && mouseX < 159) && (mouseY > 80 && mouseY < 143)) {
                screen = 1;
            }
            break;

        case 3:
            if ((mouseX > 287 && mouseX < 512) && (mouseY > 493 && mouseY < 555)) {
                screen = 4;
            }
            if ((mouseX > 80 && mouseX < 159) && (mouseY > 80 && mouseY < 143)) {
                screen = 2;
            }
            break;

        case 4:
            switch (uitour) {
                case 0:
                    if ((mouseX > 80 && mouseX < 161) && (mouseY > 355 && mouseY < 418)) {
                        screen = 3;
                    }

                    if ((mouseX > 1120 && mouseX < 1200) && (mouseY > 350 && mouseY < 418)) {
                        uitour = 1;
                    }
                    break;

                case 1:
                    if ((mouseX > 80 && mouseX < 161) && (mouseY > 355 && mouseY < 418)) {
                        uitour = 0;
                    }

                    if ((mouseX > 1120 && mouseX < 1200) && (mouseY > 350 && mouseY < 418)) {
                        uitour = 2;
                    }
                    break;

                case 2:
                    if ((mouseX > 80 && mouseX < 161) && (mouseY > 355 && mouseY < 418)) {
                        uitour = 1;
                    }
                    if ((mouseX > 975 && mouseX < 1200) && (mouseY > 578 && mouseY < 640)) {
                        screen = 5;
                    }
                    break;
            }
            break;

        case 5:
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
                            if ((bottleStack.size() + game.takeout[1]) <= bottleStack.capacity || bottleStack.size() == 0) {
                                if (bottleStack.peek() === 'empty' || bottleStack.peek() === game.takeout[0]) {

                                    game.addMove();

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
                                    setTimeout(function () {
                                        backgroundColor = 'black';
                                    }, 100);

                                    return false;

                                }
                            }




                            backgroundColor = 'red';
                            setTimeout(function () {
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
                game.addMove();

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

            break;
    }

}







