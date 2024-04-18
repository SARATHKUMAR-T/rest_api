"use strict";
class Insta {
    constructor() { }
}
class FaceBook extends Insta {
    constructor() {
        super();
    }
    getPost() {
        console.log("post something");
    }
}
const snap = new FaceBook();
console.log(snap);
