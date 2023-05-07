/*
  Warnings:

  - You are about to drop the column `kid_id` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `walletId` to the `children` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_kid_id_fkey";

-- AlterTable
ALTER TABLE "children" ADD COLUMN     "walletId" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "kid_id";

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
