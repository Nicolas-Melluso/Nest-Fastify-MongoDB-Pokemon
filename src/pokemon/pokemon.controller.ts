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
    Query
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreatePokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from "./pokemon.service";
 
@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    
    @Post('/create')
    async createPokemon(@Res() res: FastifyReply, @Body() createPokemonDTO: CreatePokemonDTO) {
        const pokemon = await this.pokemonService.createPokemon(createPokemonDTO);
        res.status(HttpStatus.OK).send({
            message: `The pokemon was created successfully`,
            pokemon,
        });
    }

    @Get('/')
    async getPokemon(@Res() res: FastifyReply) {
        const pokemons = await this.pokemonService.getPokemons();
        res.status(HttpStatus.OK).send({
            pokemons,
        });
    }

    @Get('/:id')
    async getPokemonById(@Res() res: FastifyReply, @Param('id') pokemonID) {
        if (pokemonID.match(/^[0-9a-fA-F]{24}$/)) {
            const pokemon = await this.pokemonService.getPokemon(pokemonID);
            if(!pokemon) throw new NotFoundException('The pokemon does not exist yet, try in the next generation');
            res.status(HttpStatus.OK).send({
                message: `This is your pokemon with the ID ${ pokemonID }`,
                pokemon,
            });
        }
        res.status(HttpStatus.NOT_ACCEPTABLE).send({
            message: `The ID ${ pokemonID } must be an legal ID `,
        });
    }

    @Delete('/delete')
    async deletePokemon(@Res() res: FastifyReply, @Query('id') pokemonID) {
        const pokemon = await this.pokemonService.deletePokemon(pokemonID);
        if(!pokemon) throw new NotFoundException('The pokemon you wanted to eliminate did not exist, you have nothing to worry about anymore');
        res.status(HttpStatus.OK).send({
            message: `Pokemon eliminated successfully`,
            pokemon,
        });
    }

    @Put('/:id')
    async updatePokemon(@Res() res: FastifyReply, @Body() createPokemonDTO: CreatePokemonDTO, @Param('id') pokemonID) {
        const pokemon = await this.pokemonService.updatePokemon(pokemonID, createPokemonDTO);
        if(!pokemon) throw new NotFoundException('The pokemon does not exist yet, try in the next generation');
        res.status(HttpStatus.OK).send({
            message: `This is your new pokemon with the ID ${ pokemonID }`,
            pokemon,
        });
    }

    @Post('/generate/all')
    async generatePokemons(@Res() res: FastifyReply) {
        await this.pokemonService.generateAllPokemons();

        res.status(HttpStatus.OK).send({
            message: `This was the all pokemon that were created`,
        });
    }
}
