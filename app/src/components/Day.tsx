import dayjs from 'dayjs'
import { type Component, createSignal, createEffect, Show, For } from 'solid-js'
import type { CalendarEvent } from '@static/types'
import { CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Col } from '@components/ui/grid'
import { useCalendarContext } from '@src/store/context/calendar'

export interface DayProps {
    day: dayjs.Dayjs
    rowIdx: number
}

const Day: Component<DayProps> = (props) => {
    const [dayEvents, setDayEvents] = createSignal<CalendarEvent[]>([])
    const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent, filterEvents } =
        useCalendarContext()

    createEffect(() => {
        console.log('[Day Events]: ', props.day.format('DD-MM-YY'), ' - ', filteredEvents().length)
        /* const events = filteredEvents().filter((evt) => {
            console.log('[Event Debug]: ', evt.payload.date)
            return dayjs(evt.payload.date).format('DD-MM-YY') === props.day.format('DD-MM-YY')
        })
        console.log(events)
        setDayEvents(events) */
    })

    const getCurrentDayClass = () => {
        return props.day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? 'bg-primary text-pretty text-primary-content rounded-full w-7'
            : ''
    }

    return (
        <Col spanLg={1} class='border border-accent/5 p-2'>
            <CardHeader>
                <CardTitle class="flex flex-col items-center text-center text-sm">
                    <Show when={props.rowIdx === 0}>
                        <p class="text-sm mt-1">{props.day.format('ddd').toUpperCase()}</p>
                    </Show>
                    <p class={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                        {props.day.format('DD')}
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent
                class="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(props.day)
                    setShowEventModal(true)
                }}>
                <For each={dayEvents()}>
                    {(evt) => (
                        <div
                            onClick={() => setSelectedEvent(evt)}
                            class={`bg-${evt.label}-200 p-1 mr-3 text-base-content text-pretty text-sm rounded mb-1 truncate`}>
                            {evt.payload.title}
                        </div>
                    )}
                </For>
            </CardContent>
        </Col>
    )
}

export default Day
export { dayjs }
