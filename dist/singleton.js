"use strict";
class Singleton {
    static instance;
    constructor() {
        // Private constructor to prevent direct instantiation
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    doSomething() {
        console.log("Singleton instance performing an action.");
    }
}
// Usage:
const instance1 = Singleton.getInstance();
instance1.doSomething();
const instance2 = Singleton.getInstance();
instance2.doSomething();
console.log(instance1 === instance2); // true
