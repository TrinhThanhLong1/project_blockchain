import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateUserDto from './dto/user.create.dto';
import UpdateUserDto from './dto/user.update.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user-management')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiResponse({
    status: 20,
    description: 'Success',
    schema: { $ref: getSchemaPath(CreateUserDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  @ApiOperation({ summary: 'Get List User' })
  getList() {
    return this.userService.getList();
  }

  @Get('/details')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: { $ref: getSchemaPath(CreateUserDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  @ApiOperation({ summary: 'Get Detail User' })
  getDetail(@GetUser() user) {
    return this.userService.getOne(user.id);
  }

  @Patch('')
  @ApiResponse({ status: 201, description: 'Update Success' })
  @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  @ApiOperation({ summary: 'Update User' })
  async updateUser(@Body() body: UpdateUserDto, @GetUser() user) {
    try {
      const { username, birthDay } = body;
      const data = { username, birthDay };
      await this.userService.updateUser(user.id, data);
    } catch (error) {
      throw new HttpException(error, 400);
    }
    return {
      success: true,
      message: 'update user successfully',
    };
  }
}
