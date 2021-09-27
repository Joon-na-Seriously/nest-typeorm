import { IsString, Matches, MaxLength, MinLength } from "class-validator";

// 이렇게 validation pipe 안에 message를 넣어서 error 메시지를 뽑아낼 수 있다.
export class AuthCredentialDto {
    @IsString()
    @MinLength(4, {
        message: "4자 이상 적으셈"
    })
    @MaxLength(20)    
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)    
    // 영어랑 숫자만 가능한 validation check
    // regex를 이용할 수 있다!
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password only accepts english and number"
    })
    password: string; 
}