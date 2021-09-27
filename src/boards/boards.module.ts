import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';

@Module({
  imports: [
    // typeorm module 중 board repository를 쓰겠다고 import
    TypeOrmModule.forFeature([BoardRepository]),
  ],
  providers: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}
