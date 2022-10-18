import { Document } from 'mongoose';

export interface Pokemon extends Document {
  readonly pokedexNumber: number;
  readonly name: string;
  level: number;
  experience: number;
  readonly gender: string;
  readonly elements: Array<string>;
  readonly imageUrl: string;
  readonly createdAt: Date;
}
