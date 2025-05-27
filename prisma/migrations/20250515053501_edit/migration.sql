/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "updatedAt",
ALTER COLUMN "price" DROP NOT NULL;
