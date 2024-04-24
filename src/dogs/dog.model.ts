import * as mongoose from 'mongoose';

export const DogSchema = new mongoose.Schema({
    breed: { type: String, required: true },
    picture: { type: String, required: true },
    size: { type: String, required: true },
    fact: { type: String, required: true },
});


export interface Dog extends mongoose.Document {
    id: string;
    breed: string;
    picture: string;
    size: string;
    fact: string;
}