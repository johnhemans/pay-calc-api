import { Allowance, Penalty } from '@prisma/client';

export interface CalcOvertimeTotalRequest {
  awardCode: string;
  classificationId: string;
  annualSalary: number;
  roundedAnnualBaseRate: number;
  hoursPerWeek: number;
  payPeriod: number;
  leaveLoading: number;
}

export interface CalcOvertimeTotalResponse {
  hours: number;
  amount: number;
  allowances: Allowance[];
}

export type CalcPenalty = Penalty & {
  hours: number;
};
