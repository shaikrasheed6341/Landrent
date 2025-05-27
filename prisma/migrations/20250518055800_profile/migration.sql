/*
  Warnings:

  - You are about to drop the column `message` on the `profile` table. All the data in the column will be lost.
  - Added the required column `description` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paragraph` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "message",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "paragraph" TEXT NOT NULL,
ADD COLUMN     "quatation" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
