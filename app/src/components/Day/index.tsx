import dayjs from 'dayjs'
import { type Component, createSignal, createEffect, Show, For } from 'solid-js'
import type { CalendarEvent } from '@static/types/interfaces'
import { useCalendarContext } from '@src/store/context/calendar'

export interface DayProps {
    day: dayjs.Dayjs
    rowIdx: number
}

const Day: Component<DayProps> = (props) => {
    const [dayEvents, setDayEvents] = createSignal<CalendarEvent[]>([])
    const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } =
        useCalendarContext()

    createEffect(() => {
        const events = filteredEvents().filter(
            (evt) => dayjs(evt.payload.date).format('DD-MM-YY') === props.day.format('DD-MM-YY'),
        )
        setDayEvents(events)
    })

    const getCurrentDayClass = () => {
        return props.day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? 'bg-red-600 text-white rounded-full w-7'
            : ''
    }

    return (
        <div
            class="border border-gray-200 flex flex-col"
            style={{
                'border-top-left-radius': '8px',
                'border-top-right-radius': '8px',
                'border-bottom-left-radius': '8px',
                'border-bottom-right-radius': '8px',
                'box-shadow':
                    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}>
            <header class="flex flex-col items-center">
                <Show when={props.rowIdx === 0}>
                    <p class="text-sm mt-1">{props.day.format('ddd').toUpperCase()}</p>
                </Show>
                <p class={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {props.day.format('DD')}
                </p>
            </header>
            <div
                class="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(props.day)
                    setShowEventModal(true)
                }}>
                <For each={dayEvents()}>
                    {(evt) => (
                        <div
                            onClick={() => setSelectedEvent(evt)}
                            class={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
                            {evt.payload.title}
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default Day
export { dayjs }
