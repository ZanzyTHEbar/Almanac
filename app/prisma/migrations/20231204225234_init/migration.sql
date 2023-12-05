/*
  Warnings:

  - You are about to drop the `CalendarContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `calendarContentId` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `calendarEventsId` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `calendar_name` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CalendarContent";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calendar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "calendar_name" TEXT NOT NULL,
    CONSTRAINT "Calendar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calendar" ("authorId", "createdAt", "id", "published", "title", "updatedAt") SELECT "authorId", "createdAt", "id", "published", "title", "updatedAt" FROM "Calendar";
DROP TABLE "Calendar";
ALTER TABLE "new_Calendar" RENAME TO "Calendar";
CREATE UNIQUE INDEX "Calendar_title_key" ON "Calendar"("title");
CREATE UNIQUE INDEX "Calendar_calendar_name_key" ON "Calendar"("calendar_name");
CREATE TABLE "new_CalendarEvents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calendar_name" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "allDay" BOOLEAN NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "interactive" BOOLEAN NOT NULL,
    "calendarId" TEXT,
    CONSTRAINT "CalendarEvents_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CalendarEvents" ("allDay", "calendar_name", "date", "end", "groupId", "id", "interactive", "start", "title", "url") SELECT "allDay", "calendar_name", "date", "end", "groupId", "id", "interactive", "start", "title", "url" FROM "CalendarEvents";
DROP TABLE "CalendarEvents";
ALTER TABLE "new_CalendarEvents" RENAME TO "CalendarEvents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
