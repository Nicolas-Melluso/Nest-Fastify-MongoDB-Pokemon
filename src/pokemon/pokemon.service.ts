import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Pokemon } from "./interfaces/pokemon.interface";
import { CreatePokemonDTO } from "./dto/pokemon.dto";

@Injectable()
export class PokemonService {
    constructor(@InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>) {}

    async getPokemons(): Promise<Pokemon[]> {
        const pokemons = await this.pokemonModel.find();
        return pokemons;
    }

    async getPokemon(pokemonID: string): Promise<Pokemon> {
        const pokemon = await this.pokemonModel.findById(pokemonID);
        return pokemon;
    }

    async createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<Pokemon>{
        const newPokemon = await new this.pokemonModel(createPokemonDTO);
        return await newPokemon.save();
    }

    async deletePokemon(pokemonID: string): Promise<Pokemon>{
        const deletedPokemon = await this.pokemonModel.findByIdAndDelete(pokemonID);
        return deletedPokemon;
    }

    async updatePokemon(pokemonID: string, createPokemonDTO: CreatePokemonDTO): Promise<Pokemon> {
        const updatedPokemon = await this.pokemonModel.findByIdAndUpdate(pokemonID, createPokemonDTO, { new: true });
        return updatedPokemon;
    }
}
