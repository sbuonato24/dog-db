import { Delete, Injectable, NotFoundException } from "@nestjs/common";

import { Dog } from './dog.model'
@Injectable()
export class DogsService {
    private dogs: Dog[] = [];

    insertDog(breed: string, picture: string, size: string, fact: string) {
        const dogId = Math.random().toString();
        const newDog = new Dog(dogId, breed, picture, size, fact);
        this.dogs.push(newDog);
        return dogId;
    }

    getDogs() {
        return [...this.dogs];
    }

    getSingleDog(dogId: string) {
        console.log(this.dogs[0]);
        const dog = this.findDog(dogId)[0];
        return { ...dog };
    }

    updateDog(dogId: string, breed: string, picture: string, size: string, fact: string) {
        const [dog, index] = this.findDog(dogId);
        const updatedDog = { ...dog };
        if (breed) {
            updatedDog.breed = breed;
        }
        if (picture) {
            updatedDog.picture = picture;
        }
        if (size) {
            updatedDog.size = size;
        }
        if (fact) {
            updatedDog.fact = fact;
        }
        this.dogs[index] = updatedDog;
    }

    deleteDog(dogId: string) {
       const index = this.findDog(dogId)[1];
       this.dogs.splice(index, 1);
    }

    private findDog(id: string): [Dog, number] {
        const dogIndex = this.dogs.findIndex(dog => dog.id === id);
        const dog = this.dogs[dogIndex];
        if (!dog) {
            throw new NotFoundException('Could not find dog.');
        }
        return [dog, dogIndex];
    }
}