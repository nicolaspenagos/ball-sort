

class Game{

    constructor(){

        this.currentGame  =  [ ] ;
        this.levelOneA = [
            [4],
            ['blue', 'red', 'yellow', 'blue'],
            ['blue', 'red', 'yellow', 'yellow'],
            ['red', 'yellow', 'blue', 'red'],
            ['blue','blue','blue'],
            ['yellow','yellow','yellow','yellow']
        ];

    }

    loadLevel = (level) =>{

        let capacity = level[0];
    
        for (let i = 1; i < level.length; i++) {

            let current = level[i];
            let currentStack = new Stack(capacity);
            this.currentGame.push(currentStack);

            for (let j = 0; j < current.length; j++) {
                currentStack.push(current[j]);
            }
        }
    
    }
    
}


















