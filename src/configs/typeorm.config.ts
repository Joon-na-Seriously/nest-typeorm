import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "board-app",
    // entity를 이용해서 db table을 생성해준다. 따라서 entity 파일이 어디에 있는지 설정해주어야 함.
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true,
}