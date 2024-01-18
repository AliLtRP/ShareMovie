import { OmitType } from '@nestjs/mapped-types';
import { AuthEntity } from '../entities/auth.entity';

export class FindAuthDto extends OmitType(AuthEntity, ['id', 'name']) {}
