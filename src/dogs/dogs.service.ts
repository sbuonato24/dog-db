import { Injectable } from "@nestjs/common";

import { Dog } from './dog.model'
@Injectable()
export class DogsService {
    dogs: Dog[] = [];

    insertDog(breed: string, picture: string, size: string, fact: string) {
        const dogId = new Date().toString();
        const newDog = new Dog(dogId, breed, picture, size, fact);
        this.dogs.push(newDog);
        return dogId;
    }
}