import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    // passport module이 기본적으로 이용하는 것은 jwt라고 명시해주자.
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      // server에서 저장되는 secret key는 임의로 정해주면됨.
      secret: "Secret1234",
      signOptions: {
        // 언제 토큰이 만료되는지. -> 3600분 이후에 만료
        expiresIn: 3600 * 60
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
