"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomLinks = RandomLinks;
function RandomLinks(len) {
    const option = "priyamnhsu04304-30jkjdkejejfkjffe303";
    let length = option.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += option[Math.floor(Math.random() * length)];
    }
    return result;
}
