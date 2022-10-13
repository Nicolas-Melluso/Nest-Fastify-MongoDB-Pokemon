import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { TrainerModule } from './trainer/trainer.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PokemonModule, TrainerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}