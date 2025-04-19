/*
  Warnings:

  - You are about to drop the `Bike` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('pending', 'in_progress', 'done');

-- DropTable
DROP TABLE "Bike";

-- CreateTable
CREATE TABLE "bikes" (
    "bikeId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("bikeId")
);

-- CreateTable
CREATE TABLE "service_records" (
    "serviceId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_records_pkey" PRIMARY KEY ("serviceId")
);
