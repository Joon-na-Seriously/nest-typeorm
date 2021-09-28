import { User } from "src/auth/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "../boards.model";

// Entity 데코레이터 클래스는 Board 클래스가 entity임을 나타내는데 사용됨. 
@Entity()
export class Board extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, { eager : false })
    user: User;

}
