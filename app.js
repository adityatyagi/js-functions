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


