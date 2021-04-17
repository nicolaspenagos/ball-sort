class Game {

    constructor() {

        this.currentGame = [];
        this.currentBottlesState = [];
        this.levelOneA = [
            [4],
            ['blue', 'red', 'yellow', 'blue'],
            ['blue', 'red', 'yellow', 'yellow'],
            ['red', 'yellow', 'blue', 'red'],
            [],
            []
        ];
        this.takeout;
        this.currentTime;
        this.intervalId;
        this.finished = false;
        this.movements = 0;

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

        this.currentTime = 120;

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



}