import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test } from "@nestjs/testing";
import console from "console";
import { UserService } from "../../user/user.service";
import { jwtConfig } from "../../../configs/configs.constants";
import { UserModule } from "../../user/user.module";
import { AuthController } from "../auth.controller"
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/auth.login.dto";
import TokenDto from "../dto/token.dto";
import { JwtStrategy } from "../jwt.strategy";
import { AuthModule } from "../auth.module";
import { authStub } from "./stubs/auth.stub";

jest.mock('../auth.service')

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/nestJs'),
                UserModule,
                // PassportModule,
                // JwtModule.register({
                //     secret: jwtConfig.secret_AT,
                //     signOptions: { expiresIn: '6000s' },
                // }),
            ],
            controllers: [AuthController],
            providers: [AuthService, UserService],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
        jest.clearAllMocks();
    })

    describe('login', () => {
        describe('login is called', () => {
            let token: TokenDto;
            beforeEach(async (): Promise<TokenDto> => {
                return token = await authController.login({
                    "username": authStub().username,
                    "password": authStub().password
                })
            })

            // test(' then it call authService', () => {
            //     expect(authService.login).toBeCalledWith(loginDto.username, loginDto.password);
            // })

            test(' then return token ', () => {
                expect(typeof token).toEqual(TokenDto);
            })
        })
    })
})