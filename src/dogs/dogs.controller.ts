import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { DogsService } from "./dogs.service";

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}
    
    @Post()
    async addDog(
        @Body('breed') dogBreed: string,
        @Body('picture') dogPic: string, 
        @Body('size') dogSize: string, 
        @Body('fact') dogFact: string,
        ) {
        const generatedId = await this.dogsService.insertDog(
            dogBreed, dogPic, dogSize, dogFact
        );
        return { id: generatedId };
    }

    @Get()
    async getAllDogs() {
        const dogs = await this.dogsService.getDogs();
        return dogs
    }

    @Get(':id')
    getDog(@Param('id') dogId: string) {
        return this.dogsService.getSingleDog(dogId);
    }

    @Patch(':id')
    async updateDog(
        @Param('id') dogId: string,
        @Body('breed') dogBreed: string, 
        @Body('picture') dogPic: string, 
        @Body('size') dogSize: string, 
        @Body('fact') dogFact: string
    ) {
        await this.dogsService.updateDog(dogId, dogBreed, dogPic, dogSize, dogFact);
        return null;
    }

    @Delete(':id')
    async removeDog(@Param('id')dogId: string,) {
        await this.dogsService.deleteDog(dogId);
        return null;
    }
}
