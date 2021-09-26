import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

// 이렇게 controller decoration으로 board에 관한 controller라는 정의를 내려줌
// root route 뒤에 /board 가 붙는다.
@Controller('board')
export class BoardsController {
    // dependancy injection을 contructor로 해주어야 함.
    constructor(private readonly boardsService: BoardsService){}

    @Get("/")
    getAllBoard(): Board[]{
        
        return this.boardsService.getAllBoards();
    }

}
