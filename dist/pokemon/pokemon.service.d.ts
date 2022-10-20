import { Model } from 'mongoose';
import { Pokemon } from './interfaces/pokemon.interface';
import { CreatePokemonDTO } from './dto/pokemon.dto';
export declare class PokemonService {
    private readonly pokemonModel;
    constructor(pokemonModel: Model<Pokemon>);
    getPokemons(): Promise<Pokemon[]>;
    getPokemon(pokemonID: string): Promise<Pokemon>;
    createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<Pokemon>;
    deletePokemon(pokemonID: string): Promise<Pokemon>;
    updatePokemon(pokemonID: string, createPokemonDTO: CreatePokemonDTO): Promise<Pokemon>;
    generatePokemons(pokedexID: number, quantity: number, generateAll?: boolean): Promise<Array<Pokemon>>;
}
