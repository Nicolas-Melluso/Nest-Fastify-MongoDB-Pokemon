"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomValue = void 0;
function randomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomValue = randomValue;
//# sourceMappingURL=helper.js.map