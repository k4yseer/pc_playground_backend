import { Module } from '@nestjs/common';
import { CpuModule } from './cpu/cpu.module';
// import postgresConfig from '../../config/database.config';

@Module({
  imports: [CpuModule]
})
export class PcSimModule {}
