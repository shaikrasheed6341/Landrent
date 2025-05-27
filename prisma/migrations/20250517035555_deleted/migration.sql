/*
  Warnings:

  - You are about to drop the column `image2` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `paragraph` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "paragraph";
