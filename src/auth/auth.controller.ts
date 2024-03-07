import { Controller, Post, Body, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { loginDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { Resp } from 'src/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post("login")
  async login(@Body(ValidationPipe) payload: loginDto){
    try {
      const result = await this.userService.login(payload);
      return Resp.success(200, "Login Success", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }
}
