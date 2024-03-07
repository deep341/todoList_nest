import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Resp } from "../utils/response.util";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const result = await this.usersService.createUser(createUserDto);
      return Resp.success(200, null, result);
    } catch (error) {
      return Resp.error();
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();
      return Resp.success(200, null, result);
    } catch (error) {
      return Resp.error();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.usersService.findOne(+id);
      return Resp.success(200, null, result);
    } catch (error) {
      return Resp.error();
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersService.update(+id, updateUserDto);
      return Resp.success(200, null, result);
    } catch (error) {
      return Resp.error();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return Resp.success(200, null);
    } catch (error) {
      return Resp.error();
    }
  }
}
