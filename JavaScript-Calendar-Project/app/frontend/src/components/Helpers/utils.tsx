import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

/**
 * @brief Returns a dayjs 2D array of Date objects representing the days of the month
 * @param month - month to get days for
 * @returns - array of days in month
 */
export function getMonthDays(month: number = dayjs().month()): Dayjs[][] {
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfMonth;
    const daysMatrix = new Array(6).fill([]).map(() =>
        new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    );
    return daysMatrix;
}
