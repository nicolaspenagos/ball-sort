var stack = new Stack(5);

console.log(stack.push("Rojo"));
console.log(stack.getArray());
console.log(stack.push("Verde"));
console.log(stack.getArray());
console.log(stack.push("Amarillo"));
console.log(stack.getArray());
stack.pop();
console.log(stack.getArray());
console.log(stack.peek());