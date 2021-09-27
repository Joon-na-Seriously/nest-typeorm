import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import e from "express";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // 이미 있는 아이디 block하기
    // 1. repository에서 findOne()을 이용해서 같은 이름의 아이디가 있는지 확인하고 없다면 데이터 저장 -> DB 2번 거치게 된다
    // 2. DB 레벨에서 만약 같은 이름을 가진 유저가 있다면 error를 반환해서 던져줌 -> DB 1번 거침
    // auth entity에서 unique 속성을 던져주면 됨.
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const new_user = this.create({ username: username, password: password});

        try {
            await this.save(new_user);
        } catch (err) {
            if (err.code === "23505") {
                throw new ConflictException("유저이름이 이미 존재합니다!");
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }
    
}