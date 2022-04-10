import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AwardService } from './award.service';
import { CalculateService } from './calculate.service';
import { ClassificationService } from './classification.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AwardService,
    ClassificationService,
    PrismaService,
    CalculateService,
  ],
})
export class AppModule {}
