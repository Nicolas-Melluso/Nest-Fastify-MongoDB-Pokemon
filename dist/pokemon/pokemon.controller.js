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
exports.PokemonController = void 0;
const common_1 = require("@nestjs/common");
const pokemon_dto_1 = require("./dto/pokemon.dto");
const pokemon_service_1 = require("./pokemon.service");
let PokemonController = class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }
    async createPokemon(res, createPokemonDTO) {
        const pokemon = await this.pokemonService.createPokemon(createPokemonDTO);
        res.status(common_1.HttpStatus.OK).send({
            message: `The pokemon was created successfully`,
            pokemon,
        });
    }
    async getPokemon(res) {
        const pokemons = await this.pokemonService.getPokemons();
        res.status(common_1.HttpStatus.OK).send({
            pokemons,
        });
    }
    async getPokemonById(res, pokemonID) {
        if (pokemonID.match(/^[0-9a-fA-F]{24}$/)) {
            const pokemon = await this.pokemonService.getPokemon(pokemonID);
            if (!pokemon)
                throw new common_1.NotFoundException('The pokemon does not exist yet, try in the next generation');
            res.status(common_1.HttpStatus.OK).send({
                message: `This is your pokemon with the ID ${pokemonID}`,
                pokemon,
            });
        }
        res.status(common_1.HttpStatus.NOT_ACCEPTABLE).send({
            message: `The ID ${pokemonID} must be an legal ID `,
        });
    }
    async deletePokemon(res, pokemonID) {
        const pokemon = await this.pokemonService.deletePokemon(pokemonID);
        if (!pokemon)
            throw new common_1.NotFoundException('The pokemon you wanted to eliminate did not exist, you have nothing to worry about anymore');
        res.status(common_1.HttpStatus.OK).send({
            message: `Pokemon eliminated successfully`,
            pokemon,
        });
    }
    async updatePokemon(res, createPokemonDTO, pokemonID) {
        const pokemon = await this.pokemonService.updatePokemon(pokemonID, createPokemonDTO);
        if (!pokemon)
            throw new common_1.NotFoundException('The pokemon does not exist yet, try in the next generation');
        res.status(common_1.HttpStatus.OK).send({
            message: `This is your new pokemon with the ID ${pokemonID}`,
            pokemon,
        });
    }
    async generatePokemons(res) {
        const listPokemon = await this.pokemonService.generateAllPokemons();
        res.status(common_1.HttpStatus.OK).send({
            message: `This was the all pokemon that were created`,
            pokemonsCreated: listPokemon,
        });
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pokemon_dto_1.CreatePokemonDTO]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "createPokemon", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "getPokemon", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "getPokemonById", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "deletePokemon", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pokemon_dto_1.CreatePokemonDTO, Object]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "updatePokemon", null);
__decorate([
    (0, common_1.Post)('/generate/all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "generatePokemons", null);
PokemonController = __decorate([
    (0, common_1.Controller)('pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
exports.PokemonController = PokemonController;
//# sourceMappingURL=pokemon.controller.js.map