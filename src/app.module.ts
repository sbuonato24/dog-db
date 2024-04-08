import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
