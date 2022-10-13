"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PokemonSchema = new mongoose_1.Schema({
    pokedexNumber: { type: Number, required: true, unique: true },
    name: { type: String, default: "Missigno", required: false },
    level: { type: Number, default: 1, required: false },
    experience: { type: Number, default: 0, required: false },
    elements: { type: (Array), required: true },
    minimumLevelToEvolve: { type: Number, required: true },
    inWhoEvolve: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
//# sourceMappingURL=pokemon.schema.js.map