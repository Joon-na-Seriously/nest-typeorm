import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBoardDto } from 'src/dto/create-borad.dto';
import { Board, BoardStatus } from './boards.model';
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

    @Get("/:id")
    getBoardById(@Param("id") id: string): Board{
        return this.boardsService.getBoardById(id);
    }

    @Post("/")
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete("/:id")
    deleteBoard(@Param("id") id: string): void {
        return this.boardsService.deleteBoard(id);
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id") id: string,
        @Param("status") status: BoardStatus,
    ): Board {
        return this.boardsService.updateBoardStatus(id, status);
    }

}
