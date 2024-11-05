/*
  Warnings:

  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Position` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "cycle" "Cycle" NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'INCOME',
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "cycle" "Cycle" NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'EXPENSE',
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
