import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}