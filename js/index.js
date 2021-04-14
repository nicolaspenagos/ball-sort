
let game;

function setup() {

    createCanvas(1280, 720);
    game = new Game();
    game.loadLevel(game.levelOneA);
    console.log(game.currentGame);
    console.log(game.currentGame.length);

}

function draw() {

    background(0);

    fill(255,255,255);


    let gameToDraw = game.currentGame;
    let columns = gameToDraw.length + 2;

    let spacing = 1280 / columns;

    for(let i=0; i<gameToDraw.length; i++){

        let x = spacing * (i+1);
        let currentStack = gameToDraw[i];
        let tempStack = new Stack();
        let height = 1;
        console.log(currentStack.size());

        while(currentStack.size()>0){

            let currentBall = currentStack.pop();
            fill(color(getColor(currentBall)));
            ellipse(x, 300 + (height*20), 10,10);
            height++;
            tempStack.push(currentBall);
        }

        while(tempStack.size()>0){
            currentStack.push(tempStack.pop());
        }

    }
  
}

function getColor(color){

    let colorToFill;

    switch(color){
        case 'blue':
            colorToFill = '#04d9ff';
            break;
        
        case 'yellow':
            colorToFill = '#ffff00';
            break;

        case 'red':
            colorToFill= '#ff0000';
            break;
    }

    return colorToFill;

}