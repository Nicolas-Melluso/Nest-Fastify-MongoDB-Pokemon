import { Model } from "mongoose";
import { Trainer } from "./interfaces/trainer.interface";
import { CreateTrainerDTO } from "./dto/trainer.dto";
import { Pokemon } from 'src/pokemon/interfaces/pokemon.interface';
export declare class TrainerService {
    private readonly trainerModel;
    private readonly pokemonModel;
    constructor(trainerModel: Model<Trainer>, pokemonModel: Model<Pokemon>);
    getTrainers(): Promise<Trainer[]>;
    getTrainer(trainerID: string): Promise<Trainer>;
    createTrainer(createTrainerDTO: CreateTrainerDTO): Promise<Trainer>;
    deleteTrainer(trainerID: string): Promise<Trainer>;
    updateTrainer(trainerID: string, createTrainerDTO: CreateTrainerDTO): Promise<Trainer>;
    getAllPokemon(trainerID: string): Promise<Array<Pokemon>>;
    tryCatchPokemon(trainerID: string): Promise<any>;
    tryCatchPokemonByPokedexID(trainerID: string, pokedexID: string): Promise<any>;
    releasePokemon(trainerID: string, pokemonID: string): Promise<Trainer>;
    randomPokemon(): Promise<Pokemon>;
}
