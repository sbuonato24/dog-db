import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { DogsService } from "./dogs.service";

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}
    
    @Post()
    addDog(
        @Body('breed') dogBreed: string,
        @Body('picture') dogPic: string, 
        @Body('size') dogSize: string, 
        @Body('fact') dogFact: string,
        ) {
        const generatedId = this.dogsService.insertDog(dogBreed, dogPic, dogSize, dogFact);
        return {id: generatedId};
    }

    @Get()
    getAllDogs() {
        return this.dogsService.getDogs();
    }

    @Get(':id')
    getDog(@Param('id') dogId: string) {
        return this.dogsService.getSingleDog(dogId);
    }

    @Patch(':id')
    updateDog(
        @Param('id') dogId: string,
        @Body('breed') dogBreed: string, 
        @Body('picture') dogPic: string, 
        @Body('size') dogSize: string, 
        @Body('fact') dogFact: string
    ) {
        this.dogsService.updateDog(dogId, dogBreed, dogPic, dogSize, dogFact);
        return null;
    }

    @Delete(':id')
    removeDog(@Param('id')dogId: string,) {
        this.dogsService.deleteDog(dogId);
        return null;
    }
}
