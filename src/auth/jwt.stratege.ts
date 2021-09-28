import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config';

// jwt strategy를 다른 곳에도 주입해서 사용할 수 있게 하기 위해서.
@Injectable()
// class는 PassportStratege를 상속함 (nestjs/passport 모듈 패키지의)
// passport-jwt Node.js package의 Stratege를 건네준다. 
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        // 나중에 이 token이 유효한지 확인한 후에 
        // payload안에 username이 있잖아, 이 usernme으로 user 객체를 db에서 가져올 것임 -> 이걸 구현하기 위해서 user repository를 inject하는 것
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        // 이 안에는 2개의 중요한 option을 전달해준다. 
        super({
            // JWT Strategy가 JWT 토큰을 decrypt하고 payload에 접근하기 위해서 이용할 시크릿 키 -> 모듈에서 정의해 줌
            // token이 유효한지 check하기 위함
            secretOrKey: config.get('jwt').secret,
            // 토큰이 어디에서 가져오는지. header에서 토큰이 가고, 거기서 갈 때 bearer token type으로 가기 때문에 그 토큰을 어디서 가져오는지.
            // 
            // 현재 request에서 Bearer token으로 건네진 Authorization Header에 있는 JWT를 찾기 위한 strategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    // 위에서 토큰이 유효한지 check되면 validate 메소드에서 payload에 있는 유저 이름이 DB에 있는 유저인지 확인 하고, 있다면 user 객체를 return으로 던져줌
    // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어간다.
    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOne({ username: username });
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}