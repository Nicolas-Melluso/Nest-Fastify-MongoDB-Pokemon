import { Pokemon } from "src/pokemon/interfaces/pokemon.interface";

export class CreateTrainerDTO {
      name: string;
      medals: number;
      pokeballs: number;
      pokemons: Array<Pokemon>;
      readonly createdAt: Date;
}