import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.boards.find((board) => board.id === id)
        if (!found) {
            // 찾는게 없으면 없다고 exception을 던져주어야 함
            // 원하는 문구를 넣고 싶다면,
            throw new NotFoundException(`There is no content with the id: ${id}`);
        }
        return found;
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
        const found = this.getBoardById(id);
        if (!found) {
            throw new NotFoundException(`There is no content with the id: ${id}`);
        }
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board
    }
}
