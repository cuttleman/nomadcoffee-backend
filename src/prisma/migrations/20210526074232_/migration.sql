/*
  Warnings:

  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Coffee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coffee" DROP CONSTRAINT "Coffee_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "LastName",
DROP COLUMN "caption",
DROP COLUMN "firstName",
DROP COLUMN "userName",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Coffee";
