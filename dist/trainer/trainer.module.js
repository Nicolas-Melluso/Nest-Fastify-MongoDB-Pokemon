"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trainer_controller_1 = require("./trainer.controller");
const trainer_service_1 = require("./trainer.service");
const trainer_schema_1 = require("./schemas/trainer.schema");
const pokemon_schema_1 = require("../pokemon/schemas/pokemon.schema");
let TrainerModule = class TrainerModule {
};
TrainerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Trainer', schema: trainer_schema_1.TrainerSchema },
                { name: 'Pokemon', schema: pokemon_schema_1.PokemonSchema },
            ]),
        ],
        controllers: [trainer_controller_1.TrainerController],
        providers: [trainer_service_1.TrainerService],
    })
], TrainerModule);
exports.TrainerModule = TrainerModule;
//# sourceMappingURL=trainer.module.js.map