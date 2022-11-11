import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { USER_SWAGGER_RESPONSE } from './user.constant';
import CreateUserDto from './dto/user.create.dto';
import { ApiPromise, WsProvider } from '@polkadot/api';

@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
//@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('')
  // @ApiResponse({
  //   status: 20,
  //   description: 'Success',
  //   schema: { $ref: getSchemaPath(CreateUserDto) },
  // })
  // @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  // @ApiOperation({ summary: 'Get List User' })
  // getList() {
  //   return this.userService.getList();
  // }

  @Post('')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  create(@Body() body: CreateUserDto) {
    const { walletAddress, name, email } = body;
    const data = { walletAddress, name, email };
    return this.userService.create(data);
  }

  // @Get('/details')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Success',
  //   schema: { $ref: getSchemaPath(CreateUserDto) },
  // })
  // @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  // @ApiOperation({ summary: 'Get Detail User' })
  // getDetail(@GetUser() user) {
  //   return this.userService.getOne(user.id);
  // }

  // @Patch('')
  // @ApiResponse({ status: 201, description: 'Update Success' })
  // @ApiResponse({ status: 400, description: 'Bad Reqequest' })
  // @ApiOperation({ summary: 'Update User' })
  // async updateUser(@Body() body: UpdateUserDto, @GetUser() user) {
  //   try {
  //     const { username, birthDay } = body;
  //     const data = { username, birthDay };
  //     await this.userService.updateUser(user.id, data);
  //   } catch (error) {
  //     throw new HttpException(error, 400);
  //   }
  //   return {
  //     success: true,
  //     message: 'update user successfully',
  //   };
  // }

  @Get('/polkadot')
  async polkadot() {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({
      provider: wsProvider,
    });
    const ADDR = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y';
    const account: any = await api.query.system.account(ADDR);
    // Retrieve the account balance & nonce via the system module
    return account.data.free;
  }
}
