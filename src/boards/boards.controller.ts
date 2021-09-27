import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBoardDto } from 'src/boards/dto/create-borad.dto';
import { BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { Board } from './entities/borad.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller("boards")
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get("/")
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get("/:id")
    getBoardById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete("/:id")
    deleteBoard(@Param("id", ParseIntPipe) id: number): void {
        return this.boardsService.deleteBoard(id);
    }

}



// // 이렇게 controller decoration으로 board에 관한 controller라는 정의를 내려줌
// // root route 뒤에 /board 가 붙는다.
// @Controller('board')
// export class BoardsController {
//     // dependancy injection을 contructor로 해주어야 함.
//     constructor(private readonly boardsService: BoardsService){}

//     @Get("/")
//     getAllBoard(): Board[]{
//         return this.boardsService.getAllBoards();
//     }

//     @Get("/:id")
//     // ParseIntPipe로 parameter 단위로 pipe를 이용해줌.
//     getBoardById(@Param("id", ParseIntPipe) id: string): Board{
//         return this.boardsService.getBoardById(id);
//     }

//     // handler 단위로 이용하는 pipe로 validation을 해줘야, dto에서 설정한 pipe를 이용 가능하다.
//     @Post("/")
//     @UsePipes(ValidationPipe)
//     createBoard(@Body() createBoardDto: CreateBoardDto): Board {
//         return this.boardsService.createBoard(createBoardDto);
//     }

//     @Delete("/:id")
//     deleteBoard(@Param("id") id: string): void {
//         return this.boardsService.deleteBoard(id);
//     }

//     @Patch("/:id/status")
//     updateBoardStatus(
//         @Param("id") id: string,
//         // parameter level에서 커스텀 파이프 적용
//         @Body("status", BoardStatusValidationPipe) status: BoardStatus,
//     ): Board {
//         return this.boardsService.updateBoardStatus(id, status);
//     }

// }
