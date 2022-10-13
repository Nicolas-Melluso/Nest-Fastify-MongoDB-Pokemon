import { Pokemon } from "src/pokemon/interfaces/pokemon.interface";
export declare class CreateTrainerDTO {
    name: string;
    medals: number;
    pokeballs: number;
    pokemons: Array<Pokemon>;
    readonly createdAt: Date;
}
