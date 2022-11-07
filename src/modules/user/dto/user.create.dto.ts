import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  isDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Long',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123',
  })
  password: string;

  @IsDateString()
  @ApiProperty({
    example: '2020-01-01',
  })
  birthDay: string;
}

export default CreateUserDto;
