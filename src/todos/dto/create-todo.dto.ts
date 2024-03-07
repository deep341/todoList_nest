import { IsString, IsNotEmpty, IsInt} from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    user?: User;
}
