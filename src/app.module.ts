import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://long28:2842000@cluster0.0fqfm73.mongodb.net/project_blockchain?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
