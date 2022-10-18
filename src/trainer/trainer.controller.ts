import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  HttpStatus,
  Res,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateTrainerDTO } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @Post('/create')
  async createTrainer(
    @Res() res: FastifyReply,
    @Body() createTrainerDTO: CreateTrainerDTO,
  ) {
    const trainer = await this.trainerService.createTrainer(createTrainerDTO);
    res.status(HttpStatus.OK).send({
      message: `The Trainer was created successfully`,
      trainer,
    });
  }

  @Get('/')
  async getTrainer(@Res() res: FastifyReply) {
    const trainers = await this.trainerService.getTrainers();
    res.status(HttpStatus.OK).send({
      trainers,
    });
  }

  @Get('/:id')
  async getTrainerById(@Res() res: FastifyReply, @Param('id') trainerID) {
    const trainer = await this.trainerService.getTrainer(trainerID);
    if (!trainer)
      throw new NotFoundException(
        'The Trainer does not exist yet, try in the next generation',
      );
    res.status(HttpStatus.OK).send({
      message: `This is your Trainer with the ID ${trainerID}`,
      trainer,
    });
  }

  @Delete('/delete')
  async deleteTrainer(@Res() res: FastifyReply, @Query('id') trainerID) {
    const trainer = await this.trainerService.deleteTrainer(trainerID);
    if (!trainer)
      throw new NotFoundException(
        'The Trainer you wanted to eliminate did not exist, you have nothing to worry about anymore',
      );
    res.status(HttpStatus.OK).send({
      message: `Trainer eliminated successfully`,
      trainer,
    });
  }

  @Put('/:id')
  async updateTrainer(
    @Res() res: FastifyReply,
    @Body() createTrainerDTO: CreateTrainerDTO,
    @Param('id') trainerID,
  ) {
    const trainer = await this.trainerService.updateTrainer(
      trainerID,
      createTrainerDTO,
    );
    if (!trainer)
      throw new NotFoundException(
        'The Trainer does not exist yet, try in the next generation',
      );
    res.status(HttpStatus.OK).send({
      message: `This is your new Trainer with the ID ${trainerID}`,
      trainer,
    });
  }

  //Actions with pokemons

  @Get('/:id/pokemon')
  async getTrainerPokemons(@Res() res: FastifyReply, @Param('id') trainerID) {
    const listPokemon = await this.trainerService.getAllPokemon(trainerID);
    if (!listPokemon) throw new NotFoundException('No pokemons finds');
    res.status(HttpStatus.OK).send({
      message: `This is your list of pokemon with the trainer ID ${trainerID}`,
      listPokemon,
    });
  }

  @Post('/:id/pokemon/:pokedexID')
  async tryCatchPokemonByPokedexID(
    @Res() res: FastifyReply,
    @Param('id') trainerID,
    @Param('pokedexID') pokedexID,
  ) {
    const { winrate, pokemon } =
      await this.trainerService.tryCatchPokemonByPokedexID(
        trainerID,
        pokedexID,
      );
    if (winrate <= 80) {
      res.status(HttpStatus.OK).send({
        message: `You could not catch ${pokemon.name}`,
      });
    }
    res.status(HttpStatus.OK).send({
      message: `You have captured and added pokemon ${pokemon.name} to your pokemon list`,
      pokemon,
    });
  }

  @Put('/:id/pokemon/random')
  async tryCatchPokemonRandom(
    @Res() res: FastifyReply,
    @Param('id') trainerID,
  ) {
    const { winrate, pokemon } = await this.trainerService.tryCatchPokemon(
      trainerID,
    );
    if (winrate <= 20) {
      res.status(HttpStatus.OK).send({
        message: `You found the pokemon ${pokemon.name} but you couldn't catch it`,
      });
    }
    res.status(HttpStatus.OK).send({
      message: `You have captured and added pokemon ${pokemon.name} to your pokemon list`,
      pokemon,
    });
  }

  @Delete(':trainerID/pokemon/:pokemonID')
  async releasePokemon(
    @Res() res: FastifyReply,
    @Param('trainerID') trainerID,
    @Param('pokemonID') pokemonID,
  ) {
    const trainer = await this.trainerService.releasePokemon(
      trainerID,
      pokemonID,
    );
    if (!trainer) throw new NotFoundException('That trainer does not exist');
    res.status(HttpStatus.OK).send({
      trainer,
    });
  }
}
