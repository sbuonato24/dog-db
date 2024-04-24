import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { DogSchema } from './dog.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Dog', schema: DogSchema}])
],
    controllers: [DogsController],
    providers: [DogsService],
})

export class DogsModule {}

