import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.model';
import {v1 as uuid } from "uuid";
import { CreateBoardDto } from 'src/boards/dto/create-borad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './entities/borad.entity';
import { User } from 'src/auth/entities/user.entity';



@Injectable()
export class BoardsService {
    constructor(
        // dependency injection (종속성 주입)을 해주어야 repository를 사용할 수 있음.
        // 이제 boardservice안에서 board repository를 사용할 수 있게 되었음.
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find()
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find content with id: ${id}`);
        }
        return found;
    }

    async getUserBoards(id: number, user: User):Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder("board");
        
        query.where("board.userId = :userId", {userId: id});

        const boards = await query.getMany();

        return boards;
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        await this.boardRepository.deleteBoard(id, user);
    }
    

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    


}




// DB 만들면서 바꾸어줌.
// @Injectable()
// export class BoardsService {
//     private boards: Board[] = [];
    
//     getAllBoards(): Board[] {
//         return this.boards;
//     }

//     getBoardById(id: string): Board {
//         const found = this.boards.find((board) => board.id === id)
//         if (!found) {
//             // 찾는게 없으면 없다고 exception을 던져주어야 함
//             // 원하는 문구를 넣고 싶다면,
//             throw new NotFoundException(`There is no content with the id: ${id}`);
//         }
//         return found;
//     }

//     createBoard(createBoardDto: CreateBoardDto): Board {
//         const {title, description} = createBoardDto;
//         const board: Board = {
//             // uuid: unique한 id를 부여해주는 모듈 -> db를 쓰면 알아서 넣어주지만 지금은 아니므로 넣어주자.
//             id: uuid(),
//             title,
//             description,
//             status: BoardStatus.PUBLIC
//         }
//         this.boards.push(board);
//         return board;
//     }

//     deleteBoard(id: string): void {
//         const found = this.getBoardById(id);
//         if (!found) {
//             throw new NotFoundException(`There is no content with the id: ${id}`);
//         }
//         this.boards = this.boards.filter((board) => board.id !== found.id);
//     }

//     updateBoardStatus(id: string, status: BoardStatus): Board {
//         const board = this.getBoardById(id);
//         board.status = status;
//         return board
//     }
// }
