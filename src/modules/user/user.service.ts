import { BadRequestException, Injectable } from '@nestjs/common';
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
    private readonly nftService: NftService,
  ) {
    this.wsProvider = new WsProvider('ws://127.0.0.1:9944');
  }

  hex_to_ascii(str1: string) {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
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
      return userCurrent;
    }

    userData['walletAddress'] = walletAddress;
    const user = await this.userModel.create(userData);
    const api = await ApiPromise.create({
      provider: this.wsProvider,
    });

    const account: any = await api.query.nftCurrencyPallet.listOwned(
      walletAddress,
    );

    const nftArray = [];
    for (let i = 0; i < account.length; i++) {
      const nft = await api.query.nftCurrencyPallet.tokenUri(account[i]);
      const uri = this.hex_to_ascii(nft.toHex());
      let nftInfor;
      if (uri.length > 2) {
        const { data } = await lastValueFrom(
          this.httpService.get<any>(uri.slice(2)).pipe(),
        );
        nftInfor = data;
        nftInfor['userId'] = user._id;
        nftInfor['tokenId'] = account[i];
        nftArray.push(nftInfor);
      }
    }

    await this.nftService.createNft(nftArray);
    return this.userModel.aggregate([
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

  async check(): Promise<any> {
    const api = await ApiPromise.create({
      provider: this.wsProvider,
    });

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);
  
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  }
}
