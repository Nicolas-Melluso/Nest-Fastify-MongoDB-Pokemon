import { Schema } from "mongoose";

export const PokemonSchema = new Schema({
    pokedexNumber: { type: Number, required: true},
    name: { type: String, default: "Missigno", required: false },
    level: { type: Number, default: 1, required: false },
    experience: { type: Number, default: 0, required: false },
    gender: { type: String, default: "Male", required: false },
    elements: { type: Array<String>, required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});