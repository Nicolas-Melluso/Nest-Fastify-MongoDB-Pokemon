"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const pokemon_list_1 = require("./pokemon-list");
const helper_1 = require("../helper/helper");
let PokemonService = class PokemonService {
    constructor(pokemonModel) {
        this.pokemonModel = pokemonModel;
    }
    async getPokemons() {
        const pokemons = await this.pokemonModel.find();
        return pokemons;
    }
    async getPokemon(pokemonID) {
        const pokemon = await this.pokemonModel.findById(pokemonID);
        return pokemon;
    }
    async createPokemon(createPokemonDTO) {
        const newPokemon = await new this.pokemonModel(createPokemonDTO);
        return await newPokemon.save();
    }
    async deletePokemon(pokemonID) {
        const deletedPokemon = await this.pokemonModel.findByIdAndDelete(pokemonID);
        return deletedPokemon;
    }
    async updatePokemon(pokemonID, createPokemonDTO) {
        const updatedPokemon = await this.pokemonModel.findByIdAndUpdate(pokemonID, createPokemonDTO, { new: true });
        return updatedPokemon;
    }
    async generateAllPokemons() {
        const pokemonList = [];
        for (let i = 0; i < pokemon_list_1.allPokemon.length; i++) {
            const pokemon = pokemon_list_1.allPokemon[i];
            const pokemonLevel = await (0, helper_1.randomValue)(pokemon.levelRate[0], pokemon.levelRate[1]);
            const experienceLevel = pokemonLevel * 1000 + (await (0, helper_1.randomValue)(0, 999));
            const gender = await (0, helper_1.randomValue)(0, 1);
            const createPokemonDTO = {
                pokedexNumber: pokemon.pokedexId,
                name: pokemon.name,
                level: pokemonLevel,
                experience: experienceLevel,
                gender: gender ? 'Male' : 'Female',
                elements: pokemon.elements,
                imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.pokedexId < 100
                    ? pokemon.pokedexId < 10
                        ? '00' + pokemon.pokedexId
                        : '0' + pokemon.pokedexId
                    : pokemon.pokedexId}.png`,
            };
            const newPokemon = await new this.pokemonModel(createPokemonDTO);
            pokemonList.push(newPokemon);
            await newPokemon.save();
        }
        return pokemonList;
    }
};
PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Pokemon')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PokemonService);
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.service.js.map