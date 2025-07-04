import { PartialType } from '@nestjs/mapped-types';
import { CreateCpuCoolerDto } from './create-cpu_cooler.dto';

export class UpdateCpuCoolerDto extends PartialType(CreateCpuCoolerDto) {}
