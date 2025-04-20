/*
  Warnings:

  - Added the required column `customerId` to the `bikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bikeId` to the `service_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bikes" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_records" ADD COLUMN     "bikeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bikes" ADD CONSTRAINT "bikes_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_records" ADD CONSTRAINT "service_records_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "bikes"("bikeId") ON DELETE RESTRICT ON UPDATE CASCADE;
