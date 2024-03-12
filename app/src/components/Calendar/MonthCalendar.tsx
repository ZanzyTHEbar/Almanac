import type { Component } from 'solid-js'
import CalendarHeader from '@components/Calendar/CalendarHeader'
import MonthCalendarHandler, { type MonthProps } from '@components/Calendar/MonthCalendarHandler'
import { Card } from '@components/ui/card'
import { Grid } from '@components/ui/grid'

const MonthCalendar: Component<MonthProps> = (props) => {
    const cols = 7
    return (
        <Card
            style={{
                transition: 'width 0.3s ease-in-out',
            }}
            class="flex-grow w-full rounded-box overflow-x-hidden mt-2 mb-2 mr-2 ml-1">
            <CalendarHeader id="calendar" />
            <Grid cols={cols} class="w-full h-full">
                <MonthCalendarHandler month={props.month} />
            </Grid>
        </Card>
    )
}

export default MonthCalendar
