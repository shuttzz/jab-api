/*
  Warnings:

  - You are about to drop the column `balance` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `amount_to_spend` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "balance",
ADD COLUMN     "amount_to_spend" DECIMAL(10,2) NOT NULL;
