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

    takeout = (index) => {

        let counter = 0;
        let content;
        let movement = [];

        var kill = false;

        while (!kill) {




            if (this.count > 0) {

                if (counter == 0) {
                    content = this.pop();
                    counter++;

                } else if (content === this.peek()) {
                    this.pop();
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
            movement.push(index);
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

        if (this.count > 0) {
            return this.stack[this.count - 1];
        } else {
            return 'empty';
        }
    }

    getArray = () => {
        return this.stack;
    }

}