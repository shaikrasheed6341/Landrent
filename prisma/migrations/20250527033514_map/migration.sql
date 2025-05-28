/*
  Warnings:

  - You are about to drop the column `latitude` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);
