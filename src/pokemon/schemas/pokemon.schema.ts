import { Schema } from "mongoose";

export const PokemonSchema = new Schema({
    name: { type: String, required: true },
    level: Number,
    elements: { type: Array<String>, required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});