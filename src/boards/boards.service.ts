import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid } from "uuid";
import { CreateBoardDto } from 'src/dto/create-borad.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    
    getAllBoards(): Board[] {
        return this.boards;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id)
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const {title, description} = createBoardDto;
        const board: Board = {
            // uuid: unique한 id를 부여해주는 모듈 -> db를 쓰면 알아서 넣어주지만 지금은 아니므로 넣어주자.
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board
    }
}
