import { InternalServerErrorException } from "@nestjs/common";

export class Resp {
    static success(code: number, message?: string, data?: any){
        return {
            statusCode: code,
            message: message ? message : "Success",
            data: data
        }
    }

    static error(){
        throw new InternalServerErrorException();
    }
}