import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { Calendar, EventAddArg, EventDropArg } from '@fullcalendar/core'
//import { Component, createElement } from '@fullcalendar/core/preact'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import momentPlugin, { toMoment, toMomentDuration } from '@fullcalendar/moment'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FullCalendarElement } from '@fullcalendar/web-component'
import { createSignal, onCleanup, onMount } from 'solid-js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CalendarHeader from '../src/components/CalendarHeader'
import { useCalendarContext } from '@src/store/context/calendar'
import { CalendarEvent } from '@static/types/interfaces'

declare module 'solid-js' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'g-calendar': any // replace any with the type of props
        }
    }
}

customElements.define('g-calendar', FullCalendarElement)

/* class CustomDayHeader extends Component<{ text: string }> {
    render() {
        return createElement('div', {}, '!' + this.props.text + '!')
    }
} */

const FullCalendar = () => {
    const [calendar, setCalendar] = createSignal<Calendar>()

    const [calendarRef, setCalendarRef] = createSignal<unknown>(null)

    const { setSavedEvents, savedEvents } = useCalendarContext()

    const handleEndDate = (begin: number, days: number) => {
        const end = Date.now() + 1000 * 60 * 60 * 24 * days
        const beginDate = new Date(begin)

        if (beginDate.getDate() === new Date(end).getDate()) {
            return
        }
        const date = new Date(end)
        date.setDate(date.getDate())
        return date
    }

    const handleDateClick = (arg: DateClickArg) => {
        const m = toMoment(arg.date, calendar()!) // calendar is required
        console.debug('clicked on ' + m.format())
        console.debug(arg)
    }

    const handleEventDrop = (arg: EventDropArg) => {
        const d = toMomentDuration(arg.delta)
        console.log('event moved ' + d.humanize())
    }

    const handleEventAdd = (arg: EventAddArg) => {
        console.log(arg)
    }

    onMount(() => {
        const _calendar = new Calendar(calendarRef()! as HTMLElement, {
            plugins: [
                bootstrap5Plugin,
                momentPlugin,
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
            ],
            titleFormat: 'MMMM D, YYYY',
            initialView: 'dayGridMonth',
            themeSystem: 'bootstrap5',
            headerToolbar: {
                left: 'today prevYear,prev,next,nextYear',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            },
            initialDate: Date.now(),
            navLinks: true,
            editable: true,
            dayMaxEvents: true,
            /* dayHeaderContent(arg: DayHeaderContentArg) {
                return createElement(CustomDayHeader, { text: arg.text })
            }, */
            dateClick: handleDateClick,
            eventAdd: handleEventAdd,
            eventDrop: handleEventDrop,
            // TODO: add double click event for dayRender and eventRender callbacks
            // set the modal to show, for the eventRender callback set the selected event to the event
            events: [
                {
                    start: Date.now(),
                    title: '',
                    end: handleEndDate(10, 10),
                    allDay: true,
                },
            ],
        })

        setCalendar(_calendar)
        calendar()!.render()
    })

    onCleanup(() => {
        calendar()!.destroy()
    })

    return (
        <div class="w-full h-full">
            <div class="pb-8">
                <CalendarHeader id={'1'} />
            </div>
            <g-calendar class="w-[97%] h-[97vh] pr-3" shadow ref={setCalendarRef} />
        </div>
    )
}

export default FullCalendar
