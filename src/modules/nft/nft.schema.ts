import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type NftDocument = Nft & Document;
type atribute = {
  train_type: string;
  value: string;
};
@Schema({
  timestamps: true,
  _id: true,
})
export class Nft {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({})
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  image: string;

  @Prop()
  @ApiProperty()
  external_url: string;

  @Prop({})
  @ApiProperty()
  attributes: [atribute];
}

const NftSchema = SchemaFactory.createForClass(Nft);

export { NftSchema };
