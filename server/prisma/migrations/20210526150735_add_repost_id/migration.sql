/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,repostId,type]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "repostId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "noteInfo" ON "Note"("userId", "postId", "repostId", "type");
