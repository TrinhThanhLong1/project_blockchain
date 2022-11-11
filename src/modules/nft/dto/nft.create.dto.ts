import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

type atribute = {
  train_type: string;
  value: string;
};

export class CreateNftDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'project Atama',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '666 unconvention beings',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'ipfs://QmWxTVdAeC3PVDJ6NWb6HFruiWfXrxBCE1z4Z1M71VgB2P/385.png"',
  })
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'https://projectatama.io/',
  })
  external_url: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      {
        trait_type: 'Gender',
        value: 'Female',
      },
      {
        trait_type: 'BACKGROUND',
        value: 'Background 1',
      },
    ],
  })
  attributes: [atribute];
}

export default CreateNftDto;
