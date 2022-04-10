/*
  Warnings:

  - Added the required column `baseRate` to the `Classification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseRateType` to the `Classification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedRate` to the `Classification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedRateType` to the `Classification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classification" ADD COLUMN     "baseRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "baseRateType" TEXT NOT NULL,
ADD COLUMN     "calculatedRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedRateType" TEXT NOT NULL;
