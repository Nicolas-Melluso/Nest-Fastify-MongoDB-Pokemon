import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './interfaces/trainer.interface';
import { CreateTrainerDTO } from './dto/trainer.dto';
import { Pokemon } from 'src/pokemon/interfaces/pokemon.interface';
import { randomValue } from '../helper/helper';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<Trainer>,
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async getTrainers(): Promise<Trainer[]> {
    const trainers = await this.trainerModel.find();
    return trainers;
  }

  async getTrainer(trainerID: string): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(trainerID);
    return trainer;
  }

  async createTrainer(createTrainerDTO: CreateTrainerDTO): Promise<Trainer> {
    const newTrainer = await new this.trainerModel(createTrainerDTO);
    return await newTrainer.save();
  }

  async deleteTrainer(trainerID: string): Promise<Trainer> {
    const deletedTrainer = await this.trainerModel.findByIdAndDelete(trainerID);
    return deletedTrainer;
  }

  async updateTrainer(
    trainerID: string,
    createTrainerDTO: CreateTrainerDTO,
  ): Promise<Trainer> {
    const updatedTrainer = await this.trainerModel.findByIdAndUpdate(
      trainerID,
      createTrainerDTO,
    );
    return updatedTrainer;
  }

  //Actions with Pokemons}

  async getAllPokemon(trainerID: string): Promise<Array<Pokemon>> {
    const { pokemons } = await this.trainerModel.findById(trainerID);
    return pokemons;
  }

  async tryCatchPokemon(trainerID: string): Promise<any> {
    const pokemon = await this.randomPokemon();
    const winrate = await randomValue(1, 100);
    const trainer = await this.trainerModel.findById(trainerID);
    console.log(trainer);
    if (winrate > 20) {
      trainer.pokemons.push(pokemon);
    }
    trainer.pokeballs -= 1;
    await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
    return { winrate, pokemon };
  }

  async tryCatchPokemonByPokedexID(
    trainerID: string,
    pokedexID: string,
  ): Promise<any> {
    const pokemon = await this.pokemonModel.findOne({
      pokedexNumber: pokedexID,
    });
    const winrate = await randomValue(1, 100);
    const trainer = await this.trainerModel.findById(trainerID);
    if (winrate > 80) {
      trainer.pokemons.push(pokemon);
    }
    trainer.pokeballs -= 1;
    await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
    return { winrate, pokemon };
  }

  async releasePokemon(trainerID: string, pokemonID: string): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(trainerID);
    const newPokemons = trainer.pokemons.filter(
      (pokemon) => pokemon._id.toString() !== pokemonID,
    );
    trainer.pokemons = newPokemons;
    await this.trainerModel.findByIdAndUpdate(trainerID, trainer);
    return trainer;
  }

  async randomPokemon(): Promise<Pokemon> {
    let pokemon = null;
    while (pokemon === null) {
      const randomNumber = await randomValue(1, 151);
      pokemon = await this.pokemonModel.findOne({
        pokedexNumber: randomNumber,
      });
    }
    return pokemon;
  }
}
