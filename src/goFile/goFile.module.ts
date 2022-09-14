/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoFileService } from 'src/goFile/goFile.service';

@Module({
  imports: [HttpModule],
  providers: [GoFileService],
  exports: [GoFileService],
})
export class GoFileModule {}
