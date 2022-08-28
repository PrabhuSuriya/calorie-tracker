-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "updateUTC" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("calories", "id", "imageUrl", "name", "userId") SELECT "calories", "id", "imageUrl", "name", "userId" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
