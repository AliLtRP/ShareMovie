import { Followers as FollowersModel } from '@prisma/client';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FollowerEntity implements FollowersModel {
  @IsString()
  @IsNotEmpty()
  followed_id: string;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  followers_id: string[];

  @IsInt()
  @IsNotEmpty()
  number_of_followers: number;
}
