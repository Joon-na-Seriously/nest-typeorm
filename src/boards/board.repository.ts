import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./boards.model";
import { CreateBoardDto } from "./dto/create-borad.dto";
import { Board } from "./entities/borad.entity";

// 이 repository가 Board를 control하는 repository임을 선언해줌
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {



    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.save(board);

        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        // remove() 메소드: 무조건 존재하는 item을 remove를 통해 지워야 함 -> 아니면 404 error를 반환한다. 
        // delete() 메소드: 만약 item이 존재하면 지우고, 존재하지 않으면 아무것도 안함 
        // remove를 이용하려면, item 유무를 확인하고, 그 다음에 지워주므로 db를 2번이나 접근하게 됨 -> delete를 쓰는게 좋다.
        const result = await this.delete(id);
        

        // 확인해보면, result:  DeleteResult { raw: [], affected: 0 }
        // 이렇게 찍힘.
        // affected는 이 method를 통해 영향을 받은 것 -> 0이면 delete 된 것이 없다는 뜻이다.
        console.log("result: ",result);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    
    
}



// repository -> entity 개체와 함께 작동하며, entity 찾기, 삭제, 삽입 등을 수행해줌. 
// db state에 변화를 주는 작업은 service에서 하는게 아니라, Repository에서 하면 된다.
// 이 것을 Repository Pattern이라고 부른다.

// DB 관련 일들 (INSERT, FIND, DELETE... 등등) -> 수행해고 service에 다시 돌려주는 것.