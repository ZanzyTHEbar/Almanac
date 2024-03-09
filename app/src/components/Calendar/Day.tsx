import dayjs from 'dayjs'
import { type Component, createSignal, createEffect, Show, For } from 'solid-js'
import type { CalendarEvent } from '@static/types'
import CalendarEvents from '@components//Calendar/Events'
import { CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Col } from '@components/ui/grid'
import { Label } from '@components/ui/label'
import { useCalendarContext } from '@store/context/calendar'

// FIXME: Fix the squareness of a day
// TODO: Add method to detect winter days and put a snowflake in the day
// up to 3 snowflakes per day to show level of cold.
// TODO: Implement Droppable on Day components

export interface DayProps {
    day: dayjs.Dayjs
    rowIdx: number
}

const Day: Component<DayProps> = (props) => {
    const [dayEvents, setDayEvents] = createSignal<CalendarEvent[]>([])
    const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent, filterEvents } =
        useCalendarContext()

    createEffect(() => {
        console.log('[Day Events]: ', props.day.format('DD-MM-YY'), ' - ', filteredEvents()?.length)
        /* const events = filteredEvents().filter((evt) => {
            console.log('[Event Debug]: ', evt.payload.date)
            return dayjs(evt.payload.date).format('DD-MM-YY') === props.day.format('DD-MM-YY')
        })
        console.log(events)
        setDayEvents(events) */
    })

    const getCurrentDayClass = () => {
        let today
        props.day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? (today = true)
            : (today = false)
        return today
    }

    const handleDaysInCurrentMonth = () => {
        const month = dayjs().format('MM-YY')
        const dayMonth = props.day.format('MM-YY')
        return month === dayMonth
    }

    return (
        <Col span={1} class="border border-accent/25">
            <Show when={props.rowIdx === 0}>
                <CardHeader class="border-b-2 border-accent/25  p-2">
                    <CardTitle class="flex flex-col items-center text-center text-sm">
                        <Label class="text-xl mt-1">{props.day.format('ddd').toUpperCase()}</Label>
                    </CardTitle>
                </CardHeader>
            </Show>
            <div class="w-full flex flex-1 justify-end content-end items-end p-1">
                <p
                    classList={{
                        'text-gray-400': !handleDaysInCurrentMonth(),
                        'bg-primary text-pretty text-primary-content rounded-full w-8 h-8':
                            getCurrentDayClass(),
                    }}
                    class="text-lg p-1 my-1 text-center">
                    {props.day.format('DD')}
                </p>
            </div>
            <CardContent
                class="flex-1 cursor-pointer"
                onDblClick={() => {
                    setDaySelected(props.day)
                    setShowEventModal(true)
                }}
                onClick={() => {}}>
                <For each={dayEvents()}>{(evt) => <CalendarEvents evt={evt} />}</For>
            </CardContent>
        </Col>
    )
}

export default Day
export { dayjs }
