import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../../user/user.service';
import { JwtStrategy } from '../jwt.strategy';
import { response } from 'express';


describe('Auth', () => {
    let app: INestApplication;
    let authService: AuthService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/nestJs'),
                AuthModule,
                UserModule,
            ],
            providers: [AuthService, UserService, JwtService, JwtStrategy]
        })
            .overrideProvider(AuthService)
            .useValue(authService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });
    type token = {
        "isSuccess": boolean,
        "access_Token": string
    }
    let a: token;
    it(`POST login`, async () => {
        const body = {
            "username": "Long",
            "password": "123"
            ,
        }

        return request(app.getHttpServer())
            .post('/auth-management/login')
            .send(body)
            .expect(200)

    });

    afterAll(async () => {
        await app.close();
    });
});