import dayjs, { extend } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import {
    createContext,
    useContext,
    createMemo,
    type ParentComponent,
    Accessor,
    createEffect,
    onMount,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid'
import {
    Calendar,
    CalendarDate,
    CalendarEvent,
    CalendarEventModify,
    CalendarLabel,
    CalendarState,
} from '@static/types'

interface CalendarContext {
    /* Get */
    calendars: Accessor<Calendar[]>
    selectedCalendar: Accessor<Calendar | null>
    filteredEvents: Accessor<CalendarEvent[] | undefined>
    /* Utilities */
    getMonth: (month?: number) => dayjs.Dayjs[][]
    filterEvents: () => void
    createNewCalendar: (name: string) => void
    /* Set */
    setSelectedCalendar: (calendar: CalendarState['selectedCalendar']) => void
    setDate: (date: CalendarDate) => void
    setEvents: (event: CalendarEvent, handle: CalendarEventModify) => void
    setDaySelected: (day: CalendarDate) => void
    setShowEventModal: (state: boolean) => void
    setCurrentMonthIndex: (idx: number) => void
    setSelectedEvent: (state: CalendarEvent | null) => void
    setLabels: (label: CalendarLabel[]) => void
    setLabel: (label: CalendarLabel) => void
}

const CalendarContext = createContext<CalendarContext>()
export const CalendarProvider: ParentComponent = (props) => {
    const defaultState: CalendarState = {
        calendars: [],
        selectedCalendar: null,
    }

    const [state, setState] = createStore<CalendarState>(defaultState)
    const appState = createMemo(() => state)

    //#region events

    const createNewCalendar = (name: string) => {
        setState(
            produce((s) => {
                const calendar: Calendar = {
                    id: uuidv4(),
                    name,
                    currentMonthIdx: 0,
                    events: [],
                    showEventModal: false,
                    daySelected: dayjs().toLocaleString(),
                    selectedEvent: null,
                    labels: [],
                    filteredEvents: [],
                }

                if (s.calendars.find((cal) => cal.id === calendar.id)) return
                if (s.selectedCalendar?.id === calendar?.id) return
                if (s.calendars.find((cal) => cal.name === calendar.name)) {
                    s.selectedCalendar = calendar
                    return
                }

                s.calendars.push(calendar)
            }),
        )
    }

    const setSelectedCalendar = (calendar: CalendarState['selectedCalendar']) => {
        setState(
            produce((s) => {
                if (calendar?.id === s.selectedCalendar?.id) return
                s.selectedCalendar = calendar
            }),
        )
    }

    const setDate = (date: CalendarDate) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return

                if (typeof date === 'number') {
                    date = date.toString()
                } else if (date instanceof Date) {
                    date = date.toLocaleString()
                }

                s.selectedCalendar.daySelected = date
            }),
        )
    }

    const setDaySelected = (day: CalendarDate) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.daySelected = day
            }),
        )
    }

    const setCurrentMonthIndex = (idx: number) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.currentMonthIdx = idx
            }),
        )
    }

    const setShowEventModal = (state: boolean) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.showEventModal = state
            }),
        )
    }

    const setSelectedEvent = (state: CalendarEvent | null) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.selectedEvent = state
            }),
        )
    }

    const setLabels = (label: CalendarLabel[]) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                const new_labels = [...new Set(label.map((evt) => evt.label))].map((_label) => {
                    const currentLabel = s.selectedCalendar?.labels.find(
                        (lbl) => lbl.label === _label,
                    )
                    return {
                        _label,
                        checked: currentLabel ? currentLabel.checked : true,
                    }
                })
                console.debug('[Calendar.tsx]:', new_labels)

                s.selectedCalendar.labels = label
            }),
        )
    }

    const setLabel = (label: CalendarLabel) => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.labels.map((lbl) => (lbl.label === label.label ? lbl : label))
            }),
        )
    }

    const filterEvents = () => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                s.selectedCalendar.filteredEvents = s.selectedCalendar.events.filter(
                    (evt) =>
                        s.selectedCalendar?.labels
                            .filter((lbl) => lbl.checked)
                            .map((lbl) => lbl.label)
                            .includes(evt.label),
                )
            }),
        )
    }

    const setEvents = (event: CalendarEvent, handle: CalendarEventModify) => {
        console.debug('[Calendar.tsx]:', event)
        console.debug(appState().selectedCalendar?.events)

        setState(
            produce((s) => {
                switch (handle) {
                    case 'push':
                        return s.selectedCalendar?.events.push(event)
                    case 'update':
                        return s.selectedCalendar?.events.map((evt) =>
                            evt.uuid === event.uuid ? evt : event,
                        )
                    case 'delete':
                        return s.selectedCalendar?.events.filter((evt) => evt.uuid !== event.uuid)
                    default:
                        return s
                }
            }),
        )
        console.debug(appState().selectedCalendar?.events)
    }
    
    // TODO: setup a way to increment the month index

    //#endregion

    //#region Utilities
    extend(isoWeek)
    const year = dayjs().year()
    const month = dayjs().month()
    const today = dayjs().set('year', year)
    /*const startWeek = today.startOf('isoWeek')
     const weekDays = Array.from(new Array(7).keys()).map((index) => {
        return startWeek.add(index, 'day')
    }) */

    const startOfMonth = today.set('month', month).startOf('month')
    const startOfFirstWeek = startOfMonth.startOf('isoWeek')
    const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day')
    const daysToPrepend = Array.from(new Array(daysToFirstDay).keys())
    const daysInMonth = Array.from(new Array(startOfMonth.daysInMonth()).keys())

    const getMonth = (month = dayjs().month()) => {
        const year = dayjs().year()
        // get the first day of the month
        const firstDayofMonth = dayjs(new Date(year, month, 1)).day()
        let currentMonthCount = 0 - firstDayofMonth
        const daysMatrix = new Array(5).fill([]).map(() => {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++
                return dayjs(new Date(year, month, currentMonthCount))
            })
        })
        return daysMatrix
    }

    //const getDay = (day = DateTime.now().day) => {}
    //const getHour = (hour = DateTime.now().hour) => {}
    //const getMinute = (minute = DateTime.now().minute) => {}

    //const getYearLocalString = () => DateTime.now().year.toLocaleString()
    //const getMonthLocalString = () => DateTime.now().month.toLocaleString()
    //const getDayLocalString = () => dayjs().day
    //const getHourLocalString = () => DateTime.now().hour.toLocaleString()
    //const getMinuteLocalString = () => DateTime.now().minute.toLocaleString()

    //#endregion

    //#region Effects

    createEffect(() => {
        setState(
            produce((s) => {
                if (!s.selectedCalendar) return
                if (!s.selectedCalendar.showEventModal) {
                    setSelectedEvent(null)
                }
            }),
        )
    })

    //#endregion

    //#region Getters

    const filteredEvents = createMemo(() => {
        return appState().selectedCalendar?.events.filter(
            (evt) =>
                appState()
                    .selectedCalendar?.labels.filter((lbl) => lbl.checked)
                    .map((lbl) => lbl.label)
                    .includes(evt.label),
        )
    })

    const calendars = createMemo(() => appState().calendars)
    const selectedCalendar = createMemo(() => appState().selectedCalendar)

    //#endregion

    onMount(() => {
        // TODO: Change this to localForage or Tauri Store  when it's available
        const storageEvents = localStorage.getItem('savedEvents')
        console.log('[Load Store]:', JSON.parse(storageEvents!))
        const parsedEvents: CalendarEvent = storageEvents ? JSON.parse(storageEvents) : []
        setEvents(parsedEvents, 'push')
    })

    createEffect(() => {
        console.table(getMonth())
    })

    return (
        <CalendarContext.Provider
            value={{
                calendars,
                selectedCalendar,
                filteredEvents,
                getMonth,
                createNewCalendar,
                setEvents,
                setDate,
                setSelectedCalendar,
                setCurrentMonthIndex,
                setDaySelected,
                setShowEventModal,
                setSelectedEvent,
                setLabels,
                setLabel,
                filterEvents,
            }}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export const useCalendarContext = () => {
    const context = useContext(CalendarContext)
    if (context === undefined) {
        throw new Error('useCalendarContext must be used within a CalendarProvider')
    }
    return context
}
