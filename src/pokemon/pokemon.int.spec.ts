import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ObjectID } from 'bson';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { Pokemon } from './interfaces/pokemon.interface';
import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('Nest Pokemon Integration Test', () => {
  let app: NestFastifyApplication;
  let pokemonModel: Model<Pokemon>;

  beforeAll(async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/pokemon-test');

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    pokemonModel = module.get<Model<Pokemon>>(getModelToken('Pokemon'));
  }, 10000);

  describe('Pokemon Endpoints', () => {
    const newPokemonMock = {
      pokedexNumber: 1,
      name: 'Charmander',
      level: 14,
      experience: 14839,
      gender: 'Male',
      elements: ['Fire'],
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
      createdAt: Date.now(),
      id: new ObjectID('000000000000000000000001'),
    };
    beforeAll(async () => {
      await pokemonModel.create({
        ...newPokemonMock,
        _id: newPokemonMock.id,
      });
    });

    afterAll(async () => {
      await pokemonModel.findByIdAndDelete(newPokemonMock.id);
    });

    describe('GET', () => {
      describe('Get all pokemons', () => {
        it('should return 200 ', async () => {
          const { body, statusCode, headers, statusMessage } = await app.inject(
            {
              method: 'GET',
              url: `/pokemon`,
            },
          );
          expect(statusCode).toEqual(200);
          expect(headers['content-type']).toEqual(
            'application/json; charset=utf-8',
          );
          expect(statusMessage).toEqual('OK');
          expect(JSON.parse(body)).toMatchObject({});
        });
      });
    });
    afterAll(() => {
      mongoose.connection.close();
      app.close();
    });
  });
});
