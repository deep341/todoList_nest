import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>){}
  create(createTodoDto: CreateTodoDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await this.todoRepository.save(createTodoDto);
        resolve(todo);
      } catch (error) {
        reject(error)
      }
    })
  }

  findAll(userId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await this.todoRepository.find({
          where: {
            user: { id: userId }
          }
        });
        resolve(todo);
      } catch (error) {
        reject(error)
      }
    })
  }

  findOne(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await this.todoRepository.findOneBy({id: id});
        resolve(todo);
      } catch (error) {
        reject(error)
      }
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await this.todoRepository.update({id: id}, updateTodoDto);
        resolve(todo);
      } catch (error) {
        reject(error)
      }
    })
  }

  remove(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await this.todoRepository.update({id: id}, {deletedAt: new Date()});
        resolve(todo);
      } catch (error) {
        reject(error)
      }
    })
  }
}
