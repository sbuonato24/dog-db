import { Delete, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dog } from './dog.model';

@Injectable()
export class DogsService {
    private dogs: Dog[] = [];

    constructor(@InjectModel('Dog') private readonly dogModel: Model<Dog>
) {}

    async insertDog(breed: string, picture: string, size: string, fact: string) {
        const newDog = new this.dogModel({
            breed: breed, 
            picture: picture, 
            size: size, 
            fact: fact,
        });
        const result = await newDog.save();
        return result.id as string;
    }

    async getDogs() {
        const dogs = await this.dogModel.find().exec();
        return dogs.map((dog) => ({
            id: dog.id, 
            breed: dog.breed, 
            picture: dog.picture, 
            size: dog.size, 
            fact: dog.fact
        }));
    }

    async getSingleDog(dogId: string) {
        const dog = await this.findDog(dogId);
        return { 
            id: dog.id, 
            breed: dog.breed, 
            picture: dog.picture, 
            size: dog.size, 
            fact: dog.fact,
        };
    }

    async updateDog(dogId: string, breed: string, picture: string, size: string, fact: string) {
        const updatedDog = await this.findDog(dogId);
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
        updatedDog.save();
    }

    async deleteDog(dogId: string) {
       const result = await this.dogModel.deleteOne({_id: dogId}).exec();
       if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find dog.');
    }
    }

    private async findDog(id: string): Promise<Dog> {
        let dog;
        try{
        dog = await this.dogModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find dog.');
        }
        if (!dog) {
            throw new NotFoundException('Could not find dog.');
        }
        return dog;
    }
}