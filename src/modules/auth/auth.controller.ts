import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import CreateUserDto from '../user/dto/user.create.dto';
import { AuthService } from './auth.service';
import { hashSync } from 'bcrypt';
import { bcryptConfig } from '../../configs/configs.constants';
import { LoginDto } from './dto/auth.login.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
@Controller('auth-management')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'CreateSuccess',
    schema: { $ref: getSchemaPath(CreateUserDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() body: CreateUserDto) {
    const { username, password, birthDay } = body;
    const data = {
      username,
      password: hashSync(password, parseInt(bcryptConfig.saltRound)),
      birthDay: new Date(birthDay),
    };
    return this.authService.create(data);
  }

  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'login' })
  @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const data = { username: body.username, password: body.password };
    return this.authService.login(data);
  }
}
