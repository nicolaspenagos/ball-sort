/*
 * Stack Implementation
 */
class Stack {

    constructor(capacity) {

        this.capacity = capacity || Infinity;
        this.stack = {};
        this.count = 0;

    }


    available = () => {
        return this.capacity - this.count;
    }


    size = () => {
        return this.count;
    }

    takeout = () => {

        let counter = 0;
        let content;
        let movement = [];


        let kill = false;

        while (!kill) {

            if (size() != 0) {

                if (counter == 0) {
                    content = this.stack.pop;
                    counter++;
                } else if (content === this.stack.peek) {
                    this.stack.pop;
                    counter++;
                } else {
                    kill = true;
                }

            } else {
                kill = true;
            }

        }

        if (counter == 0) {
            return false;
        } else {
            movement.push(content);
            movement.push(counter);
        }

        return movement;

    }

    push = (val) => {

        if (this.count < this.capacity) {

            this.stack[this.count] = val;
            this.count++;
            return this.count


        } else {
            return 'The stack is full';
        }

    }

    pop = () => {

        if (this.count > 0) {
            var value = this.stack[this.count - 1];
            this.count--;
            delete this.stack[this, this.count];

            if (this._count < 0) {
                this._count = 0;
            }

            return value;
        } else {
            return 'The stack is empty';
        }

    }

    peek = () => {
        console.log("Peek");

        if (this.count > 0) {
            return this.stack[this.count - 1];
        } else {
            return 'The stack is empty';
        }
    }

    getArray = () => {
        return this.stack;
    }

}