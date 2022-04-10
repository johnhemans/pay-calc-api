import { Award } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AwardService {
  constructor(private prisma: PrismaService) {}

  async awards(): Promise<Award[]> {
    return this.prisma.award.findMany({
      include: {
        classifications: true,
      },
    });
  }
}
