import { OmitType } from '@nestjs/mapped-types';
import { LoginEntity } from '../entities/login.entity';

export class FindAuthDto extends OmitType(LoginEntity, ['id']) {}
