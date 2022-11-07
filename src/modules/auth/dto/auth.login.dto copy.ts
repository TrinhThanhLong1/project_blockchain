import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto1 {
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

    @IsOptional()
    @IsNumber({}, { each: true })
    a: number[]

}