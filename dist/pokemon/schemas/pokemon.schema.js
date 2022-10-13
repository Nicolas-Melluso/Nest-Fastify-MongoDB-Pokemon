"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PokemonSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    level: Number,
    elements: { type: (Array), required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
//# sourceMappingURL=pokemon.schema.js.map