import { PartialType } from '@nestjs/mapped-types';
import { CreateCpuCaseDto } from './create-cpu_case.dto';

export class UpdateCpuCaseDto extends PartialType(CreateCpuCaseDto) {}
