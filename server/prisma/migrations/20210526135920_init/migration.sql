/*
  Warnings:

  - A unique constraint covering the columns `[followingId,followerId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Follow.followingId_followerId_index";

-- CreateIndex
CREATE UNIQUE INDEX "Follow.followingId_followerId_unique" ON "Follow"("followingId", "followerId");
