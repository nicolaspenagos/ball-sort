/*
 * Stack Implementation
 */
class Stack {

    constructor(capacity) {

        this.capacity = capacity || Infinity;
        this.stack = {};
        this.count = 0;

    }


    size = () => {
        return this.count;
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