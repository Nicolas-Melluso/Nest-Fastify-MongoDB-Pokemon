import { Schema } from 'mongoose';
import { Pokemon } from 'src/pokemon/interfaces/pokemon.interface';

export const TrainerSchema = new Schema({
  name: { type: String, required: true },
  medals: { type: Number, required: false },
  pokeballs: { type: Number, require: false, default: 0 },
  pokemons: { type: Array<Pokemon>, required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
