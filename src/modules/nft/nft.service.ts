import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import CreateNftDto, { AddNftDto, SetUriNftDto } from './dto/nft.create.dto';

import { Nft, NftDocument } from './nft.schema';

@Injectable()
export class NftService {
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async createNft(data: CreateNftDto[]) {
    const nft = await this.nftModel.insertMany(data);
    return {
      data: nft,
    };
  }

  async addNft(data: AddNftDto) {
    const user = await this.userService.getOne(data.walletAddress);
    if (user) {
      data.userId = user._id;
      return this.nftModel.create(data);
    }
  }

  async setUri(setUriNftDto: SetUriNftDto) {
    const uri = this.hex_to_ascii(setUriNftDto.uri);
    try {
      const { data } = await lastValueFrom(
        this.httpService.get<any>(uri.slice(1)).pipe(),
      );
      return this.nftModel.findOneAndUpdate(
        { tokenId: setUriNftDto.tokenId },
        data,
      );
    } catch (error) {
      console.log(error);
    }
  }

  hex_to_ascii(str1: string) {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}
