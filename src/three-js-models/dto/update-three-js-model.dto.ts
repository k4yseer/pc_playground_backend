import { PartialType } from '@nestjs/mapped-types';
import { CreateThreeJsModelDto } from './create-three-js-model.dto';

export class UpdateThreeJsModelDto extends PartialType(CreateThreeJsModelDto) {}
