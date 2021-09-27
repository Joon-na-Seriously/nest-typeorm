import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

// 모든 pipe에는 PipeTransform을 상속받아야 함.
export class BoardStatusValidationPipe implements PipeTransform {
    // 모든 status는 PUBLIC 이나 PRIVATE만 와야하므로 이 것만 걸러주자. 
    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE,
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        // value: 처리된 parameter의 실려온 값 그 자체 (status: "sffef")를 보냈으면, value에 그게 담김
        // metadata: parameter에 대한 meta data를 포함한 객체
        // -> function : string (string을 반환하는 함수고, type은 body이며, data는 status)

        // transform method에서 return된 값은 Route 핸들러로 전달됨.
        // 그러나 Execption이 발생하면, client에 바로 전해진다.
        
        value = value.toUpperCase();
        
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }
        
        return value;
    }

    private isStatusValid = (status: any) => {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}