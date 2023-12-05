import { Calendar } from '@prisma/client'
import { db } from '.'

export const getCalendars = async (): Promise<Calendar[]> => {
    const calendars = await db.calendar.findMany()
    return calendars
}

export const getCalendarById = async (id: string): Promise<Calendar | null> => {
    const calendar = await db.calendar.findUnique({
        where: { id },
    })
    return calendar
}

export const createCalendar = async (calendar: Calendar): Promise<Calendar> => {
    const newCalendar = await db.calendar.create({
        data: calendar,
    })
    return newCalendar
}

export const updateCalendar = async (id: string, calendar: Calendar): Promise<Calendar | null> => {
    const updatedCalendar = await db.calendar.update({
        where: { id },
        data: calendar,
    })
    return updatedCalendar
}

export const deleteCalendar = async (id: string): Promise<Calendar | null> => {
    const deletedCalendar = await db.calendar.delete({
        where: { id },
    })
    return deletedCalendar
}
