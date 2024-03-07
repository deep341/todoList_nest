import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './entities/user.entity';
import { loginDto } from 'src/auth/dto/create-auth.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService){}

  async createUser(createUserDto: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.save(createUserDto);
        resolve(user);
      } catch (error) {
        reject(error)
      }
    })
  }

  findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        // {withDeleted: true}
        const user = await this.userRepository.find();
        resolve(user);
      } catch (error) {
        reject(error)
      }
    })
    
  }

  findOne(id: number): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: {
            id: id
          }
        })
        resolve(user);
      } catch (error) {
        reject(error)
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.update({id: id}, updateUserDto);
        resolve(user);
      } catch (error) {
        reject(error)
      }
    })
  }

  remove(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.update({id: id}, {deletedAt: new Date()});
        resolve(user);
      } catch (error) {
        reject(error)
      }
    })
  }

  login(payload: loginDto){
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.userRepository.findOne({
          where: {
            email: payload.email
          },
          select: {
            name: true,
            email: true,
            location: true,
            password: true
          }
        });

        if(!user){
          reject(new Error("Email address is not registered with us."))
        }

        const checkPassword = await bcrypt.compare(payload.password, user.password);

        if(!checkPassword){
          reject(new Error("Password is incorrect."));
        }

        delete user.password
        user = JSON.parse(JSON.stringify(user)); 

        const token = await this.jwtService.signAsync(user);

        resolve({
          ...user,
          token: token
        })

      } catch (error) {
        reject(error)
      }
    })
  }
}
