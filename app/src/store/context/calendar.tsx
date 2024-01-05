import dayjs from 'dayjs'
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
import {
    Calendar,
    CalendarDate,
    CalendarEvent,
    CalendarEventModify,
    CalendarLabel,
    DateUtilityObject,
} from '@static/types'

interface CalendarContext {
    /* Get */
    filteredEvents: Accessor<CalendarEvent[]>
    smallCalendarWidget: Accessor<DateUtilityObject | null>
    daySelected: Accessor<CalendarDate | undefined>
    showEventModal: Accessor<boolean>
    selectedEvent: Accessor<CalendarEvent | null>
    labels: Accessor<CalendarLabel[]>
    /* Utilities */
    getMonth: (month?: number) => dayjs.Dayjs[][]
    /* Set */
    setDate: (date: CalendarDate, smallCalendar?: boolean, selectedDay?: boolean) => void
    savedEvents: Accessor<CalendarEvent[]>
    setSavedEvents: (event: CalendarEvent, handle: CalendarEventModify) => void
    setDaySelected: (day: CalendarDate) => void
    setShowEventModal: (state: boolean) => void
    setSelectedEvent: (state: CalendarEvent | null) => void
    setLabels: (label: CalendarLabel[]) => void
    setLabel: (label: CalendarLabel) => void
    filterEvents: () => void
}

const CalendarContext = createContext<CalendarContext>()
export const CalendarProvider: ParentComponent = (props) => {
    const defaultState: Calendar = {
        daySelected: dayjs().day(),
        showEventModal: false,
        selectedEvent: null,
        labels: [],
        savedEvents: [],
        filteredEvents: [],
        smallCalendarWidget: {
            daySelected: dayjs().day(),
        },
    }

    const [state, setState] = createStore<Calendar>(defaultState)
    const appState = createMemo(() => state)

    //#region events

    const setDate = (date: CalendarDate | undefined, smallCalendar: boolean = false) => {
        setState(
            produce((s) => {
                if (typeof date === 'number') {
                    date = date.toString()
                } else if (date instanceof Date) {
                    date = date.toLocaleString()
                }

                if (smallCalendar) {
                    s.smallCalendarWidget.date = date
                    return
                }

                s.daySelected = date
            }),
        )
    }

    const setDaySelected = (day: CalendarDate) => {
        setState(
            produce((s) => {
                s.daySelected = day
            }),
        )
    }

    const setShowEventModal = (state: boolean) => {
        setState(
            produce((s) => {
                s.showEventModal = state
            }),
        )
    }

    const setSelectedEvent = (state: CalendarEvent | null) => {
        setState(
            produce((s) => {
                s.selectedEvent = state
            }),
        )
    }

    const setLabels = (label: CalendarLabel[]) => {
        setState(
            produce((s) => {
                const new_labels = [...new Set(label.map((evt) => evt.label))].map((_label) => {
                    const currentLabel = s.labels.find((lbl) => lbl.label === _label)
                    return {
                        _label,
                        checked: currentLabel ? currentLabel.checked : true,
                    }
                })
                console.log('[Calendar.tsx]:', new_labels)

                s.labels = label
            }),
        )
    }

    const setLabel = (label: CalendarLabel) => {
        setState(
            produce((s) => {
                s.labels.map((lbl) => (lbl.label === label.label ? lbl : label))
            }),
        )
    }

    const filterEvents = () => {
        setState(
            produce((s) => {
                s.filteredEvents = s.savedEvents.filter((evt) =>
                    s.labels
                        .filter((lbl) => lbl.checked)
                        .map((lbl) => lbl.label)
                        .includes(evt.label),
                )
            }),
        )
    }

    /* const filteredEvents = createMemo(() => {
        return appState().savedEvents.filter((evt) =>
            appState()
                .labels.filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label),
        )
    }) */

    const setSavedEvents = (event: CalendarEvent, handle: CalendarEventModify) => {
        console.debug('[Calendar.tsx]:', event)
        console.debug(appState().savedEvents)

        setState(
            produce((s) => {
                switch (handle) {
                    case 'push':
                        return s.savedEvents.push(event)
                    case 'update':
                        return s.savedEvents.map((evt) => (evt.uuid === event.uuid ? evt : event))
                    case 'delete':
                        return s.savedEvents.filter((evt) => evt.uuid !== event.uuid)
                    default:
                        return s
                }
            }),
        )
        console.log(appState().savedEvents)
    }

    //#endregion

    //#region Utilities
    //const getYear = (year = DateTime.now().year) => {
    //    const year = DateTime.now().year
    //}

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
                if (s.smallCalendarWidget !== null) {
                    setDate(s.smallCalendarWidget.date, true)
                }
            }),
        )
    })

    createEffect(() => {
        setState(
            produce((s) => {
                if (!s.showEventModal) {
                    setSelectedEvent(null)
                }
            }),
        )
    })
    //#endregion

    //#region Getters

    const smallCalendarWidget = createMemo(() => appState().smallCalendarWidget)
    const daySelected = createMemo(() => appState().daySelected)
    const showEventModal = createMemo(() => appState().showEventModal)
    const selectedEvent = createMemo(() => appState().selectedEvent)
    const labels = createMemo(() => appState().labels)
    const savedEvents = createMemo(() => appState().savedEvents)
    const filteredEvents = createMemo(() => appState().filteredEvents)

    //#endregion

    onMount(() => {
        // TODO: Change this to localForage or Tauri Store
        const storageEvents = localStorage.getItem('savedEvents')
        console.log('[Load Store]:', JSON.parse(storageEvents!))
        const parsedEvents: CalendarEvent = storageEvents ? JSON.parse(storageEvents) : []
        setSavedEvents(parsedEvents, 'push')
    })

    return (
        <CalendarContext.Provider
            value={{
                filteredEvents,
                smallCalendarWidget,
                daySelected,
                showEventModal,
                selectedEvent,
                labels,
                getMonth,
                savedEvents,
                setSavedEvents,
                setDate,
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
