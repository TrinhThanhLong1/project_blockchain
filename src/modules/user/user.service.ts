import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UpdateUserDto from './dto/user.update.dto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { User, UserDocument } from './user.schema';
import { HttpService } from '@nestjs/axios';
import { NftService } from '../nft/nft.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  wsProvider;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => NftService))
    private readonly nftService: NftService,
  ) {
    this.wsProvider = new WsProvider('ws://127.0.0.1:9944');
  }

  async create(walletAddress, userData: UpdateUserDto) {
    const userCurrent = await this.userModel.aggregate([
      {
        $match: {
          walletAddress: walletAddress,
        },
      },
      {
        $lookup: {
          from: 'nfts',
          localField: '_id',
          foreignField: 'userId',
          as: 'nft',
        },
      },
    ]);

    if (userCurrent.length != 0) {
      return userCurrent[0];
    }

    userData['walletAddress'] = walletAddress;
    const user = await this.userModel.create(userData);
    const api = await ApiPromise.create({
      provider: this.wsProvider,
    });

    const account: any = await api.query.nftCurrency.listOwned(walletAddress);
    const nftArray = [];
    for (let i = 0; i < account.length; i++) {
      const nft = await api.query.nftCurrency.tokenUri(account[i]);
      const uri = this.nftService.hex_to_ascii(nft.toHex());
      let nftInfor = {};
      if (uri.length > 2) {
        const { data } = await lastValueFrom(
          this.httpService.get<any>(uri.slice(2)).pipe(),
        );
        nftInfor = data;
      }
      nftInfor['userId'] = user._id;
      nftInfor['tokenId'] = account[i];
      nftArray.push(nftInfor);
    }

    await this.nftService.createNft(nftArray);
    const res = await this.userModel.aggregate([
      {
        $match: {
          walletAddress: walletAddress,
        },
      },
      {
        $lookup: {
          from: 'nfts',
          localField: '_id',
          foreignField: 'userId',
          as: 'nft',
        },
      },
    ]);
    return res[0];
  }

  async update(walletAddress, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.findOneAndUpdate(walletAddress, updateUserDto);
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('bad request exception');
    }
  }

  async getOne(walletAddress: string) {
    return this.userModel.findOne({ walletAddress: walletAddress });
  }
}
