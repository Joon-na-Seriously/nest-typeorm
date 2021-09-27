import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}