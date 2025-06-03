/*
  Warnings:

  - You are about to drop the column `demoUrl` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "demoUrl",
ADD COLUMN     "demoLink" TEXT;
