import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid } from "uuid";

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string): Board {
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
}
