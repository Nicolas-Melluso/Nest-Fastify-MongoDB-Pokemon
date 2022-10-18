import { Document } from 'mongoose';
import { Pokemon } from 'src/pokemon/interfaces/pokemon.interface';

export interface Trainer extends Document {
  name: string;
  medals: number;
  pokeballs: number;
  pokemons: Array<Pokemon>;
  readonly createdAt: Date;
}
