import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [DogsModule, MongooseModule.forRoot('mongodb+srv://sbuonato24:sbuonato24@cluster0.t1nqkzl.mongodb.net/'
  )
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
