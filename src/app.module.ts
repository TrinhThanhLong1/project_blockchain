import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftModule } from './modules/nft/nft.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    UserModule,
    NftModule,
    MongooseModule.forRoot(
      'mongodb+srv://long28:2842000@cluster0.0fqfm73.mongodb.net/project_blockchain?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
