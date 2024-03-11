import type { Component } from 'solid-js'
import { CardContent } from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { useCalendarContext } from '@store/context/calendar'

const CalendarModalContent: Component = () => {
    const { selectedCalendar, editCalendarName } = useCalendarContext()

    return (
        <CardContent class="p-1 pb-2">
            <Label for="calendar-name-input">Calendar Name</Label>
            <Input
                type="text"
                id="calendar-name-input"
                placeholder={selectedCalendar()?.name}
                onChange={(e) => {
                    editCalendarName(e.currentTarget.value)
                }}
            />
        </CardContent>
    )
}

export default CalendarModalContent
