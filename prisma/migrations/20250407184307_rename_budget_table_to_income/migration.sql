-- AlterTable
ALTER TABLE "Income" RENAME CONSTRAINT "Budget_pkey" TO "Income_pkey";

-- RenameForeignKey
ALTER TABLE "Income" RENAME CONSTRAINT "Budget_userId_fkey" TO "Income_userId_fkey";
