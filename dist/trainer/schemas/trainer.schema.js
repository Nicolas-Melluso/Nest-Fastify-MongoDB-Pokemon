"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TrainerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    medals: { type: Number, required: false },
    pokeballs: { type: Number, require: false, default: 0 },
    pokemons: { type: (Array), required: false },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
//# sourceMappingURL=trainer.schema.js.map