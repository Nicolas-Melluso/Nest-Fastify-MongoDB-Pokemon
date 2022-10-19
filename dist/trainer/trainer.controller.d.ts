import { FastifyReply } from 'fastify';
import { CreateTrainerDTO } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';
export declare class TrainerController {
    private trainerService;
    constructor(trainerService: TrainerService);
    createTrainer(res: FastifyReply, createTrainerDTO: CreateTrainerDTO): Promise<void>;
    getTrainer(res: FastifyReply): Promise<void>;
    getTrainerById(res: FastifyReply, trainerID: any): Promise<void>;
    deleteTrainer(res: FastifyReply, trainerID: any): Promise<void>;
    updateTrainer(res: FastifyReply, createTrainerDTO: CreateTrainerDTO, trainerID: any): Promise<void>;
    getTrainerPokemons(res: FastifyReply, trainerID: any): Promise<void>;
    tryCatchPokemonByPokedexID(res: FastifyReply, trainerID: any, pokedexID: any): Promise<void>;
    tryCatchPokemonRandom(res: FastifyReply, trainerID: any): Promise<void>;
    releasePokemon(res: FastifyReply, trainerID: any, pokemonID: any): Promise<void>;
}
