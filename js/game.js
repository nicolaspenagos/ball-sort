class Game {

    constructor(level) {

        this.levelOneA = [
            [4],
            ['blue', 'red', 'yellow', 'blue'],
            ['blue', 'red', 'yellow', 'yellow'],
            ['red', 'yellow', 'blue', 'red'],
            [],
            []
        ];

        this.levelOneB = [
            [4],
            ['yellow', 'yellow', 'red', 'blue'],
            ['red', 'blue', 'red', 'blue'],
            ['yellow', 'red', 'blue', 'yellow'],
            [],
            [],
        ];

        this.levelTwoA = [
            [4],
            ['pink', 'purple', 'yellow', 'green'],
            ['pink', 'purple', 'green', 'yellow'],
            ['red', 'yellow', 'red', 'pink'],
            ['purple', 'red', 'pink', 'yellow'],
            ['purple', 'red', 'green', 'green'],
            [],
            [],
        ];

        this.levelTwoB = [
            [4],
            ['darkBlue', 'orange', 'darkGreen', 'yellow'],
            ['darkGreen', 'pink', 'green', 'white'],
            ['red', 'blue', 'purple', 'yellow'],
            ['purple', 'orange', 'blue', 'darkGreen'],
            ['darkBlue', 'pink', 'grey', 'white'],
            ['white', 'brown', 'yellow', 'darkGreen'],
            ['red', 'pink', 'blue', 'brown'],
            ['grey', 'white', 'darkBlue', 'orange'],
            ['green', 'green', 'grey', 'yellow'],
            ['brown', 'pink', 'green', 'blue'],
            ['grey', 'red', 'purple', 'brown'],
            ['orange', 'purple', 'darkBlue', 'red'],
            [],
            [],
        ];


        this.currentGame = [];
        this.currentBottlesState = [];
        this.takeout;
        this.currentTime;
        this.intervalId;
        this.finished = false;
        this.movements = 0;
        this.errors = 0;
        this.currentLevel = level;

        switch (level) {
            case 1:
                this.loadLevel(this.levelOneA);
                break;

            case 2:
                this.loadLevel(this.levelOneB);
                break;

            case 3:
                this.loadLevel(this.levelTwoA);
                break;

            case 4:
                this.loadLevel(this.levelTwoB);
                break;
        }

    }

    loadLevel = (level) => {

        let capacity = level[0];

        for (let i = 1; i < level.length; i++) {

            this.currentBottlesState.push(false);
            let current = level[i];
            let currentStack = new Stack(capacity);
            this.currentGame.push(currentStack);

            for (let j = 0; j < current.length; j++) {
                currentStack.push(current[j]);
            }
        }


    }

    starTime = () => {

        if (this.currentLevel == 3)
            this.currentTime = 120;
        else
            this.currentTime = 300;


        this.intervalId = setInterval(() => {

            this.currentTime--;
            if (this.currentTime == 0) {

                this.finished = true;
                clearInterval(this.intervalId);
            }


        }, 1000);

    }

    getTime = () => {

        let min = Math.floor(this.currentTime / 60);
        let seconds = this.currentTime % 60;

        if (seconds > 9)
            return "" + min + ":" + seconds;

        return "" + min + ":0" + seconds;

    }

    addMove = () => {
        this.movements++;
    }


    addError = () => {
        this.errors++;
    }


    gameSolved = () => {


        let m = '';
        this.a++;
        for (let i = 0; i < this.currentGame.length; i++) {
            m += ' ' + this.currentGame[i].solved;
        }


        for (let i = 0; i < this.currentGame.length; i++) {


            this.currentGame[i].stackSolved();

            if (!this.currentGame[i].solved) {
                return false;
            }

        }

        return true;
    }



    score = (level, finished, errors, movements, timeInt) => {

        let totalScore = 0;

        console.log('level: ' + level);
        console.log('finished: ' + finished);
        console.log('errors: ' + errors);
        console.log('movements: ' + movements);
        console.log('segundos: ' + timeInt);

        if (level == 1) {

            if (finished) {
                totalScore = totalScore + 32;
            }

            totalScore = totalScore - errors;

            if (movements > 16)
                movements = 16;

            totalScore = totalScore + (2 * movements);


            let t = 120 - timeInt;
            if (t < 60) {
                totalScore = totalScore + 16;
            }

            console.log('score: ' + totalScore);
            return totalScore;

        } else if (level == 2) {

            if (finished) {
                totalScore = totalScore + 24;
            }

            totalScore = totalScore - errors;
            if (movements > 38)
                movements = 38;
            totalScore = totalScore + (2 * movements);

            let t = 300 - timeInt;
            if (t < 120) {
                totalScore = totalScore + 20;
            }

            console.log('score: ' + totalScore);
            return totalScore;


        }


    }



}