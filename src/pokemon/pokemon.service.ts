import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Pokemon } from "./interfaces/pokemon.interface";
import { CreatePokemonDTO } from "./dto/pokemon.dto";
import { allPokemon } from "./pokemon-list";
import { randomValue } from "../helper/helper";

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

    async generateAllPokemons(): Promise<any>{
        allPokemon.map(async pokemon => {
            let pokemonLevel = await randomValue(pokemon.levelRate[0], pokemon.levelRate[1]);
            let experienceLevel = (pokemonLevel * 1000) + await randomValue(0, 999);
            let gender = await randomValue(0, 1);

            let createPokemonDTO = {
                pokedexNumber: pokemon.pokedexId,
                name: pokemon.name,
                level: pokemonLevel,
                experience: experienceLevel,
                gender: gender ? "Male" : "Female",
                elements: pokemon.elements,
                imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.pokedexId < 100 ? pokemon.pokedexId < 10 ? '00' + pokemon.pokedexId: '0' + pokemon.pokedexId : pokemon.pokedexId}.png`
            }

            const newPokemon = await new this.pokemonModel(createPokemonDTO);
            return await newPokemon.save();
        });
    }
}
