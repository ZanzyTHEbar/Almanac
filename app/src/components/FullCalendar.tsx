import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { Calendar, DayHeaderContentArg } from '@fullcalendar/core'
import { Component, createElement } from '@fullcalendar/core/preact'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FullCalendarElement } from '@fullcalendar/web-component'
import { createSignal, onCleanup, onMount } from 'solid-js'
import 'bootstrap-icons/font/bootstrap-icons.css'

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

class CustomDayHeader extends Component<{ text: string }> {
    render() {
        return createElement('div', {}, '!' + this.props.text + '!')
    }
}

const FullCalendar = () => {
    const [calendar, setCalendar] = createSignal<Calendar>()

    const [calendarRef, setCalendarRef] = createSignal<any>(null)

    const handleDateClick = (arg: DateClickArg) => {
        console.log(arg)
    }

    onMount(() => {
        /* calendarRef()!['options'] = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            },
            initialDate: Date.now(),
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            dayHeaderContent(arg: DayHeaderContentArg) {
                return createElement(CustomDayHeader, { text: arg.text })
            },
            dateClick: handleDateClick,
            events: [],
        } */
        const _calendar = new Calendar(calendarRef()!, {
            plugins: [
                bootstrap5Plugin,
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
            ],
            initialView: 'dayGridMonth',
            themeSystem: 'bootstrap5',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            },
            initialDate: Date.now(),
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            dayHeaderContent(arg: DayHeaderContentArg) {
                return createElement(CustomDayHeader, { text: arg.text })
            },
            dateClick: handleDateClick,
            events: [],
        })

        setCalendar(_calendar)
        calendar()!.render()
    })

    onCleanup(() => {
        calendar()!.destroy()
    })

    return (
        <>
            <g-calendar shadow ref={setCalendarRef} />
        </>
    )
}

export default FullCalendar
