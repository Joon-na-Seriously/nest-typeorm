import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string, message: string}> {
        const {username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // user token 생성 (Secret + Payload가 필요)
            const payload = {
                // user이름, user의 역할, user 이메일 등 많이 넣어줄 수 있음
                // 중요한 정보는 넣어두면 안된다.
                username : username
            }
            const accessToken = await this.jwtService.sign(payload);
            
            return { accessToken : accessToken, message: "login success"};
        } else {
            throw new UnauthorizedException("login failed");
        }
    }
}
