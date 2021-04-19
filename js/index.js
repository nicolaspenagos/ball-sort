// -------------------------------------
// CONSTANTS
// -------------------------------------
const bottleWidth = 50;
const bottleHeight = 180;
const bottleAjustment = bottleWidth / 2;
const bottleLayoutPositionY = 340;

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
let gameData = [];
let currentLevel;
let playing;
let correct = false;
let incorrect = false;
let boongaloFont;
let gif;


//-----------Will
let screen;
let uitour;
let soundBtn;
let finalScore;

var dakiti;

let menuBg;
let musicOn;
let mgameOn;
let badmov;
let goodmov;

let inst1Bg;
let inst2Bg;
let inst3Bg;
let inst4;
let inst5;
let inst6;
let game1;
let game2;
let lvlComp;
let final1;
let final2;
let final3;
//-----------Will


// -------------------------------------
// FUNCTIONS
// -------------------------------------

function preload() {
    dakiti = loadSound("sound/dakiti.mp3");
    boongaloFont = loadFont('font/b.otf');
    gif = createImg("images/gif.gif");



}

function startGame(level) {

    game = new Game(level);
    game.starTime();
    gameToDraw = game.currentGame;
    columns = gameToDraw.length + 1;
    spacing = 1280 / columns;
    backgroundColor = 'black';
    drawTakeOut = false;
    playing = true;
}



function setup() {

    textFont(boongaloFont);
    createCanvas(1280, 720);
    screen = 0;
    uitour = 0;
    finalScore = 0;
    soundBtn = true;
    dakiti.play();
    dakiti.setVolume(0.05);
    bottle = loadImage('images/bottle.png');
    pressedBottle = loadImage('images/pressed_bottle.png');
    currentLevel = 1;

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
    lvlComp = loadImage('images/menu-inst/lvlcomplete.png');

    final = loadImage('images/menu-inst/lastScreen.png');
    final1 = loadImage('images/oro.png');
    final2 = loadImage('images/plata.png');
    final3 = loadImage('images/broncepng');

    musicOn = loadImage('images/ui/musicon.png');
    mgameOn = loadImage('images/ui/mgameon.png');
    badmov = loadImage('images/ui/bad.png');
    goodmov = loadImage('images/ui/good.png');

    //----------Will

    frameRate(30);

}

function draw() {

    switch (screen) {
        case 0:
            image(menuBg, 0, 0);
            gif.position(-1000, -1000);
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
            gif.position(770, 180);
            break;
        case 4:
            gif.position(-1000, -1000);
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
            if (playing) {
                if (currentLevel == 1) {
                    image(game1, 0, 0);
                } else if (currentLevel == 2) {
                    image(game2, 0, 0);
                }

                fill(255, 255, 255);
                // Draw the game.
                gameToDraw = game.currentGame;

                bottle.resize(bottleWidth, 0);
                //Draw bottles
                for (let i = 0; i < game.currentBottlesState.length; i++) {
                    let x = spacing * (i + 1) - bottleAjustment;

                    if (game.currentBottlesState[i])
                        image(pressedBottle, x, bottleLayoutPositionY);
                    else
                        image(bottle, x, bottleLayoutPositionY);


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
                        ellipse(x, 520 - (height * 30), 30, 30);
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
                    let counter = 0;
                    while (counter < howMany) {

                        fill(color(getColor(fillColor)));
                        ellipse(spacing * (game.takeout[2] + 1), 300 - (counter * 30), 30, 30);
                        counter++;
                    }
                }


                //Draw time
                fill(255, 255, 255)
                textSize(32);
                text(game.getTime(), 144, 115);
                text(game.movements, 386, 115);

                if (game.finished) {
                    background('');
                }

            }

            //Sound Btn Feedback
            if (soundBtn == true) {
                image(mgameOn, 0, 0);
            }

            break;

        case 6:
            image(lvlComp, 0, 0);
            break;

        case 7:

            image(final, 0, 0);
            switch (finalScore) {
                case 0:

                    image(final1, 550, 300);
                    break;
                case 1:
                    mage(final2, 450, 300);
                    break;
                case 2:
                    image(final3, 450, 300);
                    break;
            }

            break;
    }

    if (correct) {
        image(goodmov, 0, 0);
    }

    if (incorrect) {
        image(badmov, 0, 0);
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
            colorToFill = '#FF6666';
            break;

        case 'pink':
            colorToFill = '#DD319F';
            break;
        case 'purple':
            colorToFill = '#A531FF';
            break;
        case 'green':
            colorToFill = '#16E49A'
            break;
        case 'orange':
            colorToFill = '#FFA230';
            break;
        case 'darkBlue':
            colorToFill = '#0731C3';
            break;
        case 'darkGreen':
            colorToFill = '#00802B';
            break;
        case 'grey':
            colorToFill = '#5F5F5F';
            break;
        case 'brown':
            colorToFill = '#673737';
            break;
        case 'white':
            colorToFill = '#FFFFFF';
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
                if (soundBtn == true) {
                    dakiti.play();
                } else if (soundBtn == false) {
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
                        //Comienzo juego
                        startGame(3);
                    }
                    break;
            }
            break;

        case 5:

            //Music Btn 

            if ((mouseX > 1122 && mouseX < 1200) && (mouseY > 77 && mouseY < 140)) {
                soundBtn = !soundBtn;
                if (soundBtn == true) {
                    dakiti.play();
                } else if (soundBtn == false) {
                    dakiti.stop();
                }
            }

            //Restart Btn 

            if ((mouseX > 1023 && mouseX < 1101) && (mouseY > 77 && mouseY < 140)) {

            }


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


                            let temp = counter;

                            if (((bottleStack.size() + game.takeout[1]) <= bottleStack.capacity || bottleStack.size() == 0) || counter - 1 == game.takeout[2]) {
                                if (bottleStack.peek() === 'empty' || bottleStack.peek() === game.takeout[0] || counter - 1 == game.takeout[2]) {



                                    counter = 0;
                                    while (counter < game.takeout[1]) {

                                        bottleStack.push(game.takeout[0]);

                                        if (game.gameSolved()) {

                                            playing = false;

                                            let dataLevel = game.currentLevel;
                                            let dataMovements = game.movements + 1;
                                            let dataErrors = game.errors;
                                            let dataTime = game.getTime();
                                            let dataTimeInt = game.currentTime;


                                            let data = {
                                                level: dataLevel,
                                                movements: dataMovements,
                                                errors: dataErrors,
                                                time: dataTime,
                                                timeInt: dataTimeInt
                                            }

                                            gameData.push(data)

                                            if (currentLevel == 1) {
                                                screen = 6;

                                                setTimeout(() => {

                                                    screen = 5;
                                                    currentLevel = 2;
                                                    startGame(4);

                                                }, 3000);
                                            } else if (currentLevel == 2) {
                                                screen = 7;
                                            }

                                            return false;



                                        }
                                        counter++;

                                    }

                                    drawTakeOut = false;

                                    for (let i = 0; i < game.currentBottlesState.length; i++) {
                                        game.currentBottlesState[i] = false;
                                    }

                                    if (temp - 1 == game.takeout[2]) {
                                        return;
                                    }


                                    game.addMove();

                                    correct = true;
                                    setTimeout(function() {
                                        correct = false;
                                    }, 250);

                                    return false;

                                }
                            }





                            game.addError();
                            incorrect = true;

                            setTimeout(function() {
                                incorrect = false;
                            }, 250);

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

            break;
    }

}