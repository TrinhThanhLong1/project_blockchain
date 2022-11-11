import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1emQmRbXDL2eSzPxmUywHQj5qHAAyMCrna24k1rQy1KPpw5',
  })
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Long',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'long2842000@gmail.com',
  })
  email: string;
}

export default CreateUserDto;
