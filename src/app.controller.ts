import { Body, Controller, Get, Post } from '@nestjs/common';
import { Award } from '@prisma/client';
import { AwardService } from './award.service';
import { CalculateService } from './calculate.service';
import {
  CalcOvertimeTotalRequest,
  CalcOvertimeTotalResponse,
} from './models/calculate.model';

@Controller()
export class AppController {
  constructor(
    private readonly awardService: AwardService,
    private readonly calculateService: CalculateService,
  ) {}

  @Get('award')
  async getAwards(): Promise<Award[]> {
    return this.awardService.awards();
  }

  @Post('calc/overtimeTotal')
  async calculateOvertimeTotal(
    @Body() calcData: CalcOvertimeTotalRequest,
  ): Promise<CalcOvertimeTotalResponse> {
    return this.calculateService.calculateOvertimeTotal(calcData);
  }
}
