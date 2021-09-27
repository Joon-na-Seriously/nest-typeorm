import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    // typeorm을 app에서 사용할 수 있게 되었음.
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
