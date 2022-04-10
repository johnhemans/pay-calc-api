import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AwardService } from './award.service';
import { ClassificationService } from './classification.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AwardService, ClassificationService],
})
export class AppModule {}
