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
exports.TrainerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const helper_1 = require("../helper/helper");
let TrainerService = class TrainerService {
    constructor(trainerModel, pokemonModel) {
        this.trainerModel = trainerModel;
        this.pokemonModel = pokemonModel;
    }
    async getTrainers() {
        const trainers = await this.trainerModel.find();
        return trainers;
    }
    async getTrainer(trainerID) {
        const trainer = await this.trainerModel.findById(trainerID);
        return trainer;
    }
    async createTrainer(createTrainerDTO) {
        const newTrainer = await new this.trainerModel(createTrainerDTO);
        return await newTrainer.save();
    }
    async deleteTrainer(trainerID) {
        const deletedTrainer = await this.trainerModel.findByIdAndDelete(trainerID);
        return deletedTrainer;
    }
    async updateTrainer(trainerID, createTrainerDTO) {
        const updatedTrainer = await this.trainerModel.findByIdAndUpdate(trainerID, createTrainerDTO);
        return updatedTrainer;
    }
    async getAllPokemon(trainerID) {
        const { pokemons } = await this.trainerModel.findById(trainerID);
        return pokemons;
    }
    async tryCatchPokemon(trainerID) {
        const pokemon = await this.randomPokemon();
        const winrate = await (0, helper_1.randomValue)(1, 100);
        const trainer = await this.trainerModel.findById(trainerID);
        console.log(trainer);
        if (winrate > 20) {
            trainer.pokemons.push(pokemon);
        }
        trainer.pokeballs -= 1;
        await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
        return { winrate, pokemon };
    }
    async tryCatchPokemonByPokedexID(trainerID, pokedexID) {
        const pokemon = await this.pokemonModel.findOne({ pokedexNumber: pokedexID });
        const winrate = await (0, helper_1.randomValue)(1, 100);
        const trainer = await this.trainerModel.findById(trainerID);
        if (winrate > 80) {
            trainer.pokemons.push(pokemon);
        }
        trainer.pokeballs -= 1;
        await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
        return { winrate, pokemon };
    }
    async releasePokemon(trainerID, pokemonID) {
        const trainer = await this.trainerModel.findById(trainerID);
        const newPokemons = trainer.pokemons.filter((pokemon) => pokemon._id.toString() !== pokemonID);
        trainer.pokemons = newPokemons;
        await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
        return trainer;
    }
    async randomPokemon() {
        let pokemon = null;
        while (pokemon === null) {
            const randomNumber = await (0, helper_1.randomValue)(1, 151);
            pokemon = await this.pokemonModel.findOne({ pokedexNumber: randomNumber });
        }
        return pokemon;
    }
};
TrainerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Trainer')),
    __param(1, (0, mongoose_2.InjectModel)('Pokemon')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], TrainerService);
exports.TrainerService = TrainerService;
//# sourceMappingURL=trainer.service.js.map