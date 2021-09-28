import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post("/signin")
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string, message: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post("/test")
    // authguard를 통해서 request안에 user 정보를 넣어줄 수 있다! -> 그리고 이렇게 request안에 자동으로 넣어지는 user객체만을 따로 빼서 넣어주고 싶다면... 커스텀 데코레이터가 필요하다.
    // 커스텀 데코레이터가 아니면, req.user로 건네주면 됨.
    // + 인증에 대한 middleware의 역할도 처리해준다! 
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        // req를 console로 찍어보면 유저의 객체가 나오는 걸 알 수 있다!
        // console.log("req", req);

        // request에 담겨져 있던 user 객체만 따로 잘 나온다! 
        console.log(user);
    }
}
