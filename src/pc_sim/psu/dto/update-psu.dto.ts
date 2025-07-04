import { PartialType } from '@nestjs/mapped-types';
import { CreatePsuDto } from './create-psu.dto';

export class UpdatePsuDto extends PartialType(CreatePsuDto) {}
