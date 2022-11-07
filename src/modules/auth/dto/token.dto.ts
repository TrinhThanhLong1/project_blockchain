import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "true",
    })
    isSuccess: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
            ".eyJ1c2VybmFtZSI6IkxvbmciLCJpZCI6IjYyZjFkZjZlYT" +
            "IzMThhOTZiNjdhY2M1OCIsImlhdCI6MTY2MDAzMjE0MCwiZXhw" +
            "IjoxNjYwMDM4MTQwfQ.ItwlvXVkBFIOSFmfjntRKICLHtN-0iJcexNx2s5sPL4",
    })
    access_Token: string;
}
export default TokenDto;