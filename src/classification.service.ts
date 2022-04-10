import { Classification } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private prisma: PrismaService) {}

  async classifications(awardCode: string): Promise<Classification[]> {
    return this.prisma.classification.findMany({
      where: { awardCode },
    });
  }
}
