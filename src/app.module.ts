import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftModule } from './modules/nft/nft.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    UserModule,
    NftModule,
    MongooseModule.forRoot(
      //'mongodb+srv://long:JliFbDS0IRZ650JM@cluster0.0n6blr0.mongodb.net/project_blockchain?retryWrites=true&w=majority',
      'mongodb://localhost:27017/project_blockchain',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
