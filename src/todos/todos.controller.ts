import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Resp } from 'src/utils/response.util';
import { Request } from "express"
import { UsersService } from 'src/users/users.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService, private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    try {
      const userData = req['user'];
      const user = await this.userService.findOne(userData.id);
      const result = await this.todosService.create({...createTodoDto, user })
      return Resp.success(200, "Todo successfully created.", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get("byUser/:id")
  async findAll(@Param("id") id: number ) {
    try {
      const result = await this.todosService.findAll(+id);
      return Resp.success(200, "Todo successfully created.", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.todosService.findOne(+id);
      return Resp.success(200, "Todo successfully created.", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    } 
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      const result = await this.todosService.update(+id, updateTodoDto);
      return Resp.success(200, "Todo successfully created.", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.todosService.remove(+id);
      return Resp.success(200, "Todo successfully created.", result)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
