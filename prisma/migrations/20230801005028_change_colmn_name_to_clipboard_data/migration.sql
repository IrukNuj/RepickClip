/*
  Warnings:

  - You are about to drop the column `counst` on the `ClipboardData` table. All the data in the column will be lost.
  - Added the required column `count` to the `ClipboardData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClipboardData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "count" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_ClipboardData" ("content", "favorite", "id", "timestamp") SELECT "content", "favorite", "id", "timestamp" FROM "ClipboardData";
DROP TABLE "ClipboardData";
ALTER TABLE "new_ClipboardData" RENAME TO "ClipboardData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
