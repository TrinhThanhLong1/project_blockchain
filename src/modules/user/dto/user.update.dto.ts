import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Long',
  })
  username: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2020-01-01',
  })
  birthDay: string;
}

export default UpdateUserDto;
