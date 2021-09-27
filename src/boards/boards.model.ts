
// interface는 변수의 type만을 check하고, class는 변수의 type도 체크하고, instance 또한 생성할 수 있음
// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
// }
//  -> 얘는 db를 쓰게 됨으로서 필요없어짐.


// 공개글인지, 비밀 게시글인지를 위한 것
export enum BoardStatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}