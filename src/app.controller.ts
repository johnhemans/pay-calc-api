import { Controller, Get } from '@nestjs/common';
import { Award } from '@prisma/client';
import { AwardService } from './award.service';

@Controller()
export class AppController {
  constructor(private readonly awardService: AwardService) {}

  @Get('award')
  async getAwards(): Promise<Award[]> {
    return this.awardService.awards();
  }
}
