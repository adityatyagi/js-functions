function add() {
    // js arguments object
    console.log('All Arguments', arguments);
    result = 0;
    for (const value of arguments) {
        result += value;
    }
    return result;
}

console.log(add(1, 2, 3));
console.log(add(1, 2, 3, 4, 5, 6, 7));


// FUNCTION SCOPE
function greetings() {
    let greeting = "Hello from function scope";
    const sayHi = function () {
        let greeting = "Hey from block scope";
        console.log(greeting);
    }
    sayHi();
    console.log(greeting);
}

greetings();


// IIFE
(function () {
    console.log('I am in an IFFE');
})();

// Closures
let greeting = (function () {
    let message = "Hey";
    let getMessage = function () {
        // child accessing parent
        return message;
    }

    // this created the IIFE into a closure
    return {
        getMessage: getMessage
    };
})();

console.log(greeting.getMessage());

function setupCounter(val) {
    return function () {
        return val++;
    }
}

let counter1 = setupCounter(0);
console.log(counter1());
console.log(counter1());
console.log(counter1());

// own context of the val variable for different variables
// each time we call the function, the variable that was setup in their context gets incremented.
let counter2 = setupCounter(10);
console.log(counter2());
console.log(counter2());
console.log(counter2());

// Arrow Functions
let greeting2 = () => {
    return "hey from arrow function";
}

console.log(greeting2());

// when only 1 line of code is present
let greeting3 = () => "hey from arrow 2";
console.log(greeting3());

// fixed number of arguments being passed
let sum = (num1, num2) => num1 + num2;
console.log(sum(1, 2));

// this keyword with arrow and regular functions
let majorGreeting = {
    name: "Aditya Tyagi",
    regularFunction: function () {
        // this is the majorGreeting object
        return "Hello " + this.name;
    },
    arrowFunction: () => {
        // this: is the window object and it looks for the name variable of the window (global object), which is not present
        return "Hello " + this.name;
    }
}

console.log(majorGreeting.regularFunction()); // Hello Aditya Tyagi
console.log(majorGreeting.arrowFunction()); // Hello


// FUNCTION CONTEXT
function sayHey() {
    console.log('Hey'); // Hey
    console.log(this); // Window {...}
}
sayHey();

// The value of this keyword changes because the execution context changed
let greetingContext = {};
greetingContext.sayHi = function () {
    console.log('Hi'); // Hi
    console.log(this); // greetingContext{..}
}

greetingContext.sayHi();

// this in Function Constructors
function sayHello() {
    console.log('hey'); // hey
    console.log(this); // [obj Object]
}

// creating an instance of Function Constructor
let newGreets = new sayHello();

// CALL
let person1 = {
    name: 'John',
    age: 18
}

let person2 = {
    name: 'Aditya',
    age: 24
}

let greetPeople = function (greeting) {
    console.log(greeting + " " + this.name);
}

greetPeople.call(person1, 'Hello');
greetPeople.call(person2, 'Hey');

// apply
function introduction(name, profession) {
    console.log(`My name is ${name} and my profession is ${profession}`);
    console.log(this);
}

introduction('Aditya', 'Coder');

// when you dont want to change the execution context i.e. the value of this keyword, you can pass undefined
introduction.call(undefined, 'Ayush', 'Player');
introduction.apply(undefined, ['Vivan', 'studying']);

// bind
let person3 = {
    name: 'Mary',
    getName: function () {
        return this.name;
    }
}

let person4 = {
    name: 'Spiderman'
};

// the object passed to the .bind() will returns a copy of that function and change the execution context of that copy function
// and assign it to the object passed to bind()
let copyOfGetName = person3.getName.bind(person4);

console.log(copyOfGetName()); // spiderman

// SOME BUILT-IN FUNCTIONS

// 1. eval
let x = 1;
let y = 2;
console.log(eval('x+y+5'));

console.log(parseInt('13', 10));
console.log(parseFloat('13.67', 10));

console.log(escape('text&%'));
console.log(unescape('text%26%25'));


