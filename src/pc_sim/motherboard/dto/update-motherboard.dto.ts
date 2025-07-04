import { PartialType } from '@nestjs/mapped-types';
import { CreateMotherboardDto } from './create-motherboard.dto';

export class UpdateMotherboardDto extends PartialType(CreateMotherboardDto) {}
