import { Module } from '@nestjs/common';
import { HorsesService } from './horses.service';
import { HorsesController } from './horses.controller';

@Module({
  controllers: [HorsesController],
  providers: [HorsesService],
})
export class HorsesModule {}
