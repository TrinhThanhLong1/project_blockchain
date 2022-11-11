import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.login.dto';
import { compareSync } from 'bcrypt';
import { User } from '../user/user.schema';
import TokenDto from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<User> {
  //   const user = await this.usersService.getUser(username);
  //   if (!user) {
  //     throw new HttpException('UN_AUTHORIZED', HttpStatus.UNAUTHORIZED);
  //   }
  //   if (!compareSync(pass, user.password)) {
  //     throw new HttpException('UN_AUTHORIZED', HttpStatus.UNAUTHORIZED);
  //   }
  //   return user;
  // }

  // async login(data: LoginDto): Promise<TokenDto> {
  //   const user = await this.validateUser(data.username, data.password);
  //   const payload = { username: user.username, id: user._id };
  //   const access_token = this.jwtService.sign(payload);
  //   return {
  //     isSuccess: true,
  //     access_Token: access_token,
  //   };
  // }

  // async create(data): Promise<User> {
  //   return this.usersService.create(data);
  // }
}
