import { HttpException, Injectable } from '@nestjs/common';
import { Allowance, Penalty } from '@prisma/client';
import {
  CalcOvertimeTotalRequest,
  CalcOvertimeTotalResponse,
  CalcPenalty,
} from './models/calculate.model';
import { PrismaService } from './prisma.service';

@Injectable()
export class CalculateService {
  constructor(private readonly prisma: PrismaService) {}

  public async calculateOvertimeTotal(request: CalcOvertimeTotalRequest) {
    const response: CalcOvertimeTotalResponse = {
      amount: undefined,
      hours: undefined,
      allowances: [],
    };

    const award = await this.prisma.award.findUnique({
      where: {
        code: request.awardCode,
      },
      include: {
        classifications: true,
      },
    });

    const classification = award.classifications.find(
      (classification) => classification.id === request.classificationId,
    );
    if (!classification) {
      throw new HttpException('Classification Not Found', 404);
    }

    const penalties = await this.prisma.penalty.findMany({
      where: { classificationId: classification.id },
    });
    const allowances = await this.prisma.allowance.findMany({
      where: { awardCode: award.code },
    });
    const overtimeTotal = this.getOvertimeTotal(
      request.annualSalary,
      request.roundedAnnualBaseRate,
      request.leaveLoading,
      allowances,
    );

    response.allowances = allowances;
    response.amount = overtimeTotal;

    if (!penalties.length) {
      const annualOvertimeLeft = overtimeTotal / classification.calculatedRate;
      const payPeriodOvertimeHours = this.getPayPeriodOvertimeHours(
        annualOvertimeLeft,
        request.payPeriod,
      );

      response.hours = payPeriodOvertimeHours;
    } else {
      const firstPenalty = this.getPenalty('first', penalties);
      const firstOvertimeHours = firstPenalty.hours * request.payPeriod;
      const firstOvertime = firstPenalty.calculatedRate * firstOvertimeHours;

      const afterOvertimeLeft = overtimeTotal - firstOvertime;
      const afterPenalty = this.getPenalty('after', penalties);
      const afterOvertimeHours =
        afterOvertimeLeft / afterPenalty.calculatedRate;

      const totalAnnualOvertimeHours = firstOvertimeHours + afterOvertimeHours;
      const overtimeHoursPerPayPeriod =
        totalAnnualOvertimeHours / request.payPeriod;

      response.hours = overtimeHoursPerPayPeriod;
    }

    return response;
  }

  private getOvertimeTotal(
    annualSalary: number,
    roundedAnnualBaseRate: number,
    leaveLoading: number,
    allowances: Allowance[],
  ): number {
    const allowanceTotal = allowances.reduce(
      (total, allowance) => total + allowance.amount,
      0,
    );

    return annualSalary - roundedAnnualBaseRate - leaveLoading - allowanceTotal;
  }

  private getPayPeriodOvertimeHours(
    annualOvertimeLeft: number,
    payPeriod: number,
  ): number {
    return annualOvertimeLeft / payPeriod;
  }

  private getPenalty(searchKey: string, penalties: Penalty[]): CalcPenalty {
    const penalty = penalties.find((p) =>
      p.name.toLowerCase().includes(searchKey),
    );
    const penaltyHours = Number(penalty.name.match(/\d+/)[0]);
    return { ...penalty, hours: penaltyHours };
  }
}
