import { Board } from "src/boards/entities/borad.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username', ])
// unique를 벗어나면 internal server error를 띄우게 된다 (500) -> 더 custom error message를 설정하고 싶다면, repository 단에서 try catch로 error를 던져주어야 함.
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // type은 보드
    // board에서 user를 접근하고 싶다면
    // 유저를 가져올 때, 게시물도 같이 가져올 수 있도록.
    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];
}