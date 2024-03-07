import { UnauthorizedException, NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction} from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService){}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization'].split(" ")[1];

            console.log("this.jwtService", this.jwtService)

            const isValid = await this.jwtService.verifyAsync(token);

            req['user'] = isValid;

            next();

        } catch (error) {
            throw new UnauthorizedException("Token is expired or token is not provide.")
        }
    }
}

