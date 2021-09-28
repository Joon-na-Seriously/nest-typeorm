import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // typeorm module 중 board repository를 쓰겠다고 import
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}
