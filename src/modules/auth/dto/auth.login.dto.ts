import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Long",
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "123",
    })
    password: string;

}