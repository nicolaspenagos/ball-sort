var currentLevel = [];
var levelOneA = [
    [4],
    ['blue', 'red', 'yellow', 'blue'],
    ['blue', 'red', 'yellow', 'yellow'],
    ['red', 'yellow', 'blue', 'red'],
    [],
    []
];


console.log(levelOneA[0].length);


function loadLevel(level) {

    let capacity = level[0];

    for (let i = 1; i < level.length; i++) {
        let currentStack = level[i];
        currentLevel[i] = new Stack(capacity);
        for (let j = 0; j < currentStack.length; j++) {
            currentLevel[i].push(currentStack[j]);
        }
    }

}

loadLevel(levelOneA);


for (let i = 1; i < currentLevel.length; i++) {
    console.log(currentLevel[i].available());
}

console.log();






var stack = new Stack(5);