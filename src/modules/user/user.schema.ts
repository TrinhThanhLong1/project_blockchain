import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop({
    get: (birthDay: Date) => {
      if (!birthDay) return;
      const momentObject = moment(birthDay);
      return momentObject.format('YYYY-MM-DD');
    },
  })
  @ApiProperty()
  birthDay: Date;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 'text' });
UserSchema.virtual('age').get(function (this: UserDocument) {
  const date = new Date();
  const birthDay = moment(this.birthDay).toDate();
  let y = date.getFullYear() - birthDay.getFullYear();
  const m = date.getMonth() - birthDay.getMonth();
  const d = date.getDate() - birthDay.getDate();
  if (m < 0) {
    y = y - 1;
  } else if (m == 0) {
    if (d > 0) y = y - 1;
  }
  return y;
});

export { UserSchema };
