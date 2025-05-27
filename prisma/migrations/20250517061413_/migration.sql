/*
  Warnings:

  - You are about to drop the `Addproperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Addproperty" DROP CONSTRAINT "Addproperty_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "paragraph" TEXT;

-- DropTable
DROP TABLE "Addproperty";
