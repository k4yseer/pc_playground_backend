import { PartialType } from '@nestjs/mapped-types';
import { CreateSsdDto } from './create-ssd.dto';

export class UpdateSsdDto extends PartialType(CreateSsdDto) {}
