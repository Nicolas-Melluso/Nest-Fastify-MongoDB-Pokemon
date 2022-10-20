import { FastifyReply } from 'fastify';
import { PokemonGenerateDTO } from './dto/pokemon-generate.dto';
import { CreatePokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';
export declare class PokemonController {
    private pokemonService;
    constructor(pokemonService: PokemonService);
    createPokemon(res: FastifyReply, createPokemonDTO: CreatePokemonDTO): Promise<void>;
    getPokemon(res: FastifyReply): Promise<void>;
    getPokemonById(res: FastifyReply, pokemonID: any): Promise<void>;
    deletePokemon(res: FastifyReply, pokemonID: any): Promise<void>;
    updatePokemon(res: FastifyReply, createPokemonDTO: CreatePokemonDTO, pokemonID: any): Promise<void>;
    generatePokemons(res: FastifyReply, pokemonGenerate: PokemonGenerateDTO): Promise<void>;
}
