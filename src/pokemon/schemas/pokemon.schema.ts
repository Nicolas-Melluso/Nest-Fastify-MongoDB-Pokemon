import { Schema } from "mongoose";

export const PokemonSchema = new Schema({
    pokedexNumber: { type: Number, required: true, unique: true },
    name: { type: String, default: "Missigno", required: false },
    level: { type: Number, default: 1, required: false },
    experience: { type: Number, default: 0, required: false },
    elements: { type: Array<String>, required: true },
    minimumLevelToEvolve: { type: Number, required: true },
    inWhoEvolve:  { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});