-- CreateTable
CREATE TABLE "CalendarEvents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calendar_name" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "allDay" BOOLEAN NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "interactive" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calendar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "calendarContentId" TEXT,
    "calendarEventsId" TEXT,
    CONSTRAINT "Calendar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Calendar_calendarContentId_fkey" FOREIGN KEY ("calendarContentId") REFERENCES "CalendarContent" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Calendar_calendarEventsId_fkey" FOREIGN KEY ("calendarEventsId") REFERENCES "CalendarEvents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Calendar" ("authorId", "calendarContentId", "content", "createdAt", "id", "published", "title", "updatedAt") SELECT "authorId", "calendarContentId", "content", "createdAt", "id", "published", "title", "updatedAt" FROM "Calendar";
DROP TABLE "Calendar";
ALTER TABLE "new_Calendar" RENAME TO "Calendar";
CREATE UNIQUE INDEX "Calendar_title_key" ON "Calendar"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
