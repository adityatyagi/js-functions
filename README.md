# js-functions
Study notes on Functions in JavaScript

# FUNCTIONS
A function is a block of organized, reusable code that is used to perform a single, related action.  

By default, all functions return a value. If it isnt returning anything, it returns `undefined`.  

**Argument**: A value that we pass to the function when we invoke it.  

**Parameter**: Is a variable that we list as part of a function defination.  

A number added with an undefined value results in Not A Number (NaN).  
`2 + undefined = NaN`  

## Arguments object
Every function has a `arguments` object which is an array of all the arguments passed to it.

```javascript
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

```
The `arguments` object will handle the "n" number of arguments.  

## SCOPE 1: Function Scope
Whenever a function cannot find a variable, it will keep looking to its parent. This is true for nested functions. The child can access the parent's variables. If it fails to find the variable in the parent's function scope, it will give a Referrence Error.  

```javascript
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
```

## SCOPE 2: Block Scope
We are talking about lifetime of a variable within `{ }` of an if statement, a while or a for-loop, or any set of `{ }` other than the function.  

**NOTE:** Variables declared with the `var` keyword or within function declarations DO NOT have Block Scope.  
It is always a good practice to use `let` or `const` instead of `var` as the latter does not have Block Scope and it can result in spaghetti code.  

## IIFE  
The IIFE (Immediately Invoked Function Expression) let us group our code and have it work in isolation independent of any other code.  

**Function Expression:** Define a function and assign it to a variable.  

**Immediately Invoked:** Invoking the function right away where it is defined.  

```javascript
(function () {
    console.log('I am in an IFFE');
})();
```

## CLOSURES
A cloure is a phenomenon where we can hold on to a function scoped variable even after its execution is over.  

*** 

# ARROW FUNCTIONS
1. Introduced in ES6  
2. Simpler way to write function expressions.  
3. Makes the code consice and more readable, shorter syntax  
4. `this` derives its value from the enclosing lexical scope.  

NOTE: They are not a substitue for the regular functions.  

## SIDE EFFECTS
1. Different behaviour of `this` keyword  
2. No `arguments` object like we have with normal functions.  

## SYNTAX
You can ommit the `{ }` if there is only one statement within the arrow function body.  

## this
`this` refers to the owner of the function we are executing.  
So, if its a standalone function, `this` refers to the global `window` object.  

Unlike regular functions, the arrow functions does not have their own `this` value.  
Moreover, the value of `this` is always inherited from the enclosing scope.  

```javascript
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
```
***  

# Changing Function Context and Built-in functions  

## FUNCTION CONTEXTS
Different execution contexts for different types of functions changes the values of the `this` keyword:  

```javascript
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
```

## CALL, APPLY, BIND  

### CALL
It sets the value of `this` to something other than the current execution context. The object which is passed as an argument to `.call()` binds the value of `this` to that object.  

You can also send other values as other arguments. 

```javascript
let person1 = {
    name: 'John',
    age: 18
}

let person2 = {
    name: 'Aditya',
    age: 24
}

let greetPeople = function () {
    console.log('Hello ' + this.name);
}

greetPeople.call(person1); // Hello John
greetPeople.call(person2); // Hello Aditya


// ----call with arguments----
let greetPeople = function (greeting) {
    console.log(greeting + " " + this.name);
}

greetPeople.call(person1, 'Hello'); // Hello John
greetPeople.call(person2, 'Hey'); // Hey Aditya
```  

### APPLY  
The only diff. between call() and apply() is that call() accepts a list of arguments (comma separated values), while apply() accepts an array of arguments.  

```javascript
function introduction(name, profession) {
    console.log(`My name is ${name} and my profession is ${profession}`);
    console.log(this);
}

introduction('Aditya', 'Coder');

// when you dont want to change the execution context i.e. the value of this keyword, you can pass undefined
introduction.call(undefined, 'Ayush', 'Player');
introduction.apply(undefined, ['Vivan', 'studying']);
```

## CALL v/s APPLY
![image](https://user-images.githubusercontent.com/18363595/79694623-199ee780-828f-11ea-9dd9-3b80d809d167.png)  

### BIND
With call() and apply() we call an exisiting function and change the function context i.e. the value of the `this` object.  
But what if we want to make a copy of a function and then change the value of `this`?  

```javascript
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
```

## BUILT-IN FUNCTIONS

1. eval() - evaluates a string
2. parseInt() - string to number  
3. parseFloat() - returns a floating point number for a string input  
4. escape() - returns hex coding of the argument in the ISO LATIN 1 char set  
5. unescape() - opp. of escape(). Returns ASCII string for the given input value

***  

# DEFAULT and REST PARAMTERS AND SPREAD OPERATOR

### DEFUALT
The default paramters should always come after the regular paramters.  

```javascript
// Default paramters
function minorGreeting(greeting = 'Hey') {
    console.log(greeting + ' John!');
}

minorGreeting(); // Hey John!
minorGreeting('Hello'); // Hello John!
```  

### REST PARAMETERS  
You can define a function with multiple arguments. When you dont know the number of arguments a function will get, use Rest parameters.  

```javascript
// REST PARAMETERS
// message is the default parameter
function finalGreeting(message, ...names) {
    names.forEach(name => console.log(message + ' ' + name));
}

finalGreeting('Hey', 'Aditya', 'Ayush', 'Pankaj');
```

The Rest parameters like Default Parameters will always come last, i.e defined after the regular parameters.  It's in the name - REST i.e. it will always store the rest/remaining arguments in the array.  

### SPREAD OPERATOR  
The spread operator is opp. how a REST parameter works. It takes an array and spreads out it items and also assign the array items to individual parameters.

```javascript
// SPREAD OPERATOR
function noMoreGreetings(name1, name2) {
    console.log(`Hey ${name1} and ${name2}`);
}

let listOfNames = ['Aditya', 'Ayush'];
noMoreGreetings(...listOfNames);

// --------------------------------------
function printABCD(a, b, c, d) {
    console.log(a, b, c, d);
}
let letters = 'ABCD';
printABCD(...letters);


// --------------------------------------
function printRest(p, q, r, s, ...t) {
    console.log(p, q, r, s);
    t.forEach(x => console.log(x));
}
let letters2 = 'PQRSTUVWXYZ';
printRest(...letters2);

```

