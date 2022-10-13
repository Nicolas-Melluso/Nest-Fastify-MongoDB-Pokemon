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
exports.TrainerController = void 0;
const common_1 = require("@nestjs/common");
const trainer_dto_1 = require("./dto/trainer.dto");
const trainer_service_1 = require("./trainer.service");
let TrainerController = class TrainerController {
    constructor(trainerService) {
        this.trainerService = trainerService;
    }
    async createTrainer(res, createTrainerDTO) {
        const trainer = await this.trainerService.createTrainer(createTrainerDTO);
        res.status(common_1.HttpStatus.OK).send({
            message: `The Trainer was created successfully`,
            trainer,
        });
    }
    async getTrainer(res) {
        const trainers = await this.trainerService.getTrainers();
        res.status(common_1.HttpStatus.OK).send({
            trainers,
        });
    }
    async getTrainerById(res, trainerID) {
        const trainer = await this.trainerService.getTrainer(trainerID);
        if (!trainer)
            throw new common_1.NotFoundException('The Trainer does not exist yet, try in the next generation');
        res.status(common_1.HttpStatus.OK).send({
            message: `This is your Trainer with the ID ${trainerID}`,
            trainer,
        });
    }
    async deleteTrainer(res, trainerID) {
        const trainer = await this.trainerService.deleteTrainer(trainerID);
        if (!trainer)
            throw new common_1.NotFoundException('The Trainer you wanted to eliminate did not exist, you have nothing to worry about anymore');
        res.status(common_1.HttpStatus.OK).send({
            message: `Trainer eliminated successfully`,
            trainer,
        });
    }
    async updateTrainer(res, createTrainerDTO, trainerID) {
        const trainer = await this.trainerService.updateTrainer(trainerID, createTrainerDTO);
        if (!trainer)
            throw new common_1.NotFoundException('The Trainer does not exist yet, try in the next generation');
        res.status(common_1.HttpStatus.OK).send({
            message: `This is your new Trainer with the ID ${trainerID}`,
            trainer,
        });
    }
    async getTrainerPokemons(res, trainerID) {
        const listPokemon = await this.trainerService.getAllPokemon(trainerID);
        if (!listPokemon)
            throw new common_1.NotFoundException('No pokemons finds');
        res.status(common_1.HttpStatus.OK).send({
            message: `This is your list of pokemon with the trainer ID ${trainerID}`,
            listPokemon,
        });
    }
    async tryCatchPokemonByPokedexID(res, trainerID, pokedexID) {
        const { winrate, pokemon } = await this.trainerService.tryCatchPokemonByPokedexID(trainerID, pokedexID);
        if (winrate <= 80) {
            res.status(common_1.HttpStatus.OK).send({
                message: `You could not catch ${pokemon.name}`,
            });
        }
        res.status(common_1.HttpStatus.OK).send({
            message: `You have captured and added pokemon ${pokemon.name} to your pokemon list`,
            pokemon,
        });
    }
    async tryCatchPokemonRandom(res, trainerID) {
        const { winrate, pokemon } = await this.trainerService.tryCatchPokemon(trainerID);
        if (winrate <= 20) {
            res.status(common_1.HttpStatus.OK).send({
                message: `You found the pokemon ${pokemon.name} but you couldn't catch it`,
            });
        }
        res.status(common_1.HttpStatus.OK).send({
            message: `You have captured and added pokemon ${pokemon.name} to your pokemon list`,
            pokemon,
        });
    }
    async releasePokemon(res, trainerID, pokemonID) {
        const trainer = await this.trainerService.releasePokemon(trainerID, pokemonID);
        if (!trainer)
            throw new common_1.NotFoundException('That trainer does not exist');
        res.status(common_1.HttpStatus.OK).send({
            trainer,
        });
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, trainer_dto_1.CreateTrainerDTO]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "createTrainer", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getTrainer", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getTrainerById", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "deleteTrainer", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, trainer_dto_1.CreateTrainerDTO, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "updateTrainer", null);
__decorate([
    (0, common_1.Get)('/:id/pokemon'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getTrainerPokemons", null);
__decorate([
    (0, common_1.Post)('/:id/pokemon/:pokedexID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('pokedexID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "tryCatchPokemonByPokedexID", null);
__decorate([
    (0, common_1.Put)('/:id/pokemon/random'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "tryCatchPokemonRandom", null);
__decorate([
    (0, common_1.Delete)(':trainerID/pokemon/:pokemonID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('trainerID')),
    __param(2, (0, common_1.Param)('pokemonID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "releasePokemon", null);
TrainerController = __decorate([
    (0, common_1.Controller)('trainer'),
    __metadata("design:paramtypes", [trainer_service_1.TrainerService])
], TrainerController);
exports.TrainerController = TrainerController;
//# sourceMappingURL=trainer.controller.js.map