import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { USER_SWAGGER_RESPONSE } from './user.constant';
import UpdateUserDto from './dto/user.update.dto';

@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
//@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':walletAddress')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(200)
  create(
    @Param('walletAddress') walletAddress: string,
    @Body() body: UpdateUserDto,
  ) {
    const data = { name: body.name };
    return this.userService.create(walletAddress, data);
  }

  @Patch(':walletAddress')
  @ApiParam({
    name: 'walletAddress',
  })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  update(@Param('walletAddress') walletAddress, @Body() body: UpdateUserDto) {
    const { name } = body;
    const data = { name };
    return this.userService.update(walletAddress, data);
  }
}
