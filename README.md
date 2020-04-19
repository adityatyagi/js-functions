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
