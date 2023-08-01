-- CreateTable
CREATE TABLE "ClipboardData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "counst" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL
);
