import { PartialType } from '@nestjs/mapped-types';
import { CreateRamDto } from './create-ram.dto';

export class UpdateRamDto extends PartialType(CreateRamDto) {}
