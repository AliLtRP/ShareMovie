import { OmitType } from '@nestjs/mapped-types';
import { FollowerEntity } from '../entities/follower.entity';

export class CreateFollowerDto extends OmitType(FollowerEntity, [
  'id',
  'followers_id',
  'number_of_followers',
]) {}
