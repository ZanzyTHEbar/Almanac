import dayjs from 'dayjs'
import { Component, createEffect, createSignal } from 'solid-js'
import { Calendar, type MonthProps } from '@components/Calendar/Calendar'
import CalendarHeader from '@components/Calendar/CalendarHeader'
import { Card, CardHeader, CardContent, CardTitle } from '@components/ui/card'
import { Grid } from '@components/ui/grid'
import { useCalendarContext } from '@src/store/context/calendar'
import { getMonthDays } from '@utils/index'

const SmallCalendar: Component<MonthProps> = (props) => {
    const [currentMonthIdx, setCurrentMonthIdx] = createSignal(dayjs().month())
    const [currentMonth, setCurrentMonth] = createSignal(getMonthDays())
    const { monthIndex, setSmallCalendarMonth } = useCalendarContext()

    createEffect(() => {
        setCurrentMonth(getMonthDays(currentMonthIdx()))
    })

    createEffect(() => {
        setCurrentMonthIdx(monthIndex()!)
    })
    const cols = 7
    return (
        <Card class="mt-9">
            <CardHeader class="flex justify-between">
                <CardTitle class="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx())).format('MMMM YYYY')}
                </CardTitle>
                <CalendarHeader id="widget" />
            </CardHeader>
            <CardContent>
                <Grid cols={cols} class="w-full h-full">
                    <Calendar month={props.month} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default SmallCalendar
