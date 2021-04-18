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
            ['green', 'green', 'green', 'red'],
            ['green', 'pink', 'red', 'yellow'],
            ['yellow', 'red', 'yellow', 'pink'],
            ['pink', 'yellow', 'pink', 'purple'],
            ['red', 'purple', 'purple', 'purple'],
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

        this.currentTime = 240;

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


        for (let i = 0; i < this.currentGame.length; i++) {

            this.currentGame[i].stackSolved();

            if (!this.currentGame[i].solved) {


                return false;
            }



        }

        return true;
    }

}