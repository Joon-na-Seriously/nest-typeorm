import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateBoardDto } from 'src/boards/dto/create-borad.dto';
import { BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { Board } from './entities/borad.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller("boards")
// AuthModule을 import 하고, UseGuard 미들웨어를 controller 단위에서 적용시키면, "board/"로 접근하는 모두에게 영향을 줄 수 있다.
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}
    private logger = new Logger("Boards");
    // log를 남겨서 확인할 수 있다.

    @Get("/")
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get("/:id")
    getBoardById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Get("/user-boards/:userid")
    getUserBoards(
        @Param("userid", ParseIntPipe) userid: number,
        @GetUser() user : User): Promise<Board[]>{
            this.logger.verbose(`User ${user.username} is trying to get all boards...`)
        return this.boardsService.getUserBoards(userid, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
            this.logger.verbose(`User ${user.username} creating new board.\nPayload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Delete("/:id")
    deleteBoard(
        @Param("id", ParseIntPipe) id: number,
        @GetUser() user: User): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus,
        ): Promise<Board> {
            return this.boardsService.updateBoardStatus(id, status);
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
