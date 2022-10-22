import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerSchema } from './schemas/trainer.schema';
import { PokemonSchema } from '../pokemon/schemas/pokemon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Trainer', schema: TrainerSchema },
      { name: 'Pokemon', schema: PokemonSchema },
    ]),
  ],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
