import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import CreateUserDto from './dto/user.create.dto';
import UpdateUserDto from './dto/user.update.dto';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userCreateDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(userCreateDto);
      return {
        data: user,
      };
    } catch (error) {
      throw new BadRequestException('bad request exception');
    }
  }

  // async getUser(username: string): Promise<User> {
  //   try {
  //     return await this.userModel.findOne({ username: username });
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  // async getList(): Promise<User[]> {
  //   try {
  //     return await this.userModel.find();
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  // async getOne(id: string): Promise<User> {
  //   try {
  //     return await this.userModel.findById(id);
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  // async updateUser(
  //   id: string,
  //   data: UpdateUserDto,
  // ): Promise<UpdateWriteOpResult> {
  //   try {
  //     return await this.userModel.updateOne({ id: id }, data);
  //   } catch (error) {
  //     throw new HttpException(error, 400);
  //   }
  // }
}
