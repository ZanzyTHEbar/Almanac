import moment from 'moment'
import {
    createContext,
    useContext,
    createMemo,
    type Component,
    Accessor,
    createEffect,
    onMount,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { Context } from '@static/types'
import {
    Calendar,
    CalendarDate,
    CalendarEvent,
    CalendarEventModify,
    CalendarLabel,
    DateUtilityObject,
} from '@static/types/interfaces'

interface CalendarContext {
    filteredEvents: Accessor<CalendarEvent[]>
    smallCalendarWidget: Accessor<DateUtilityObject | null>
    daySelected: Accessor<CalendarDate | undefined>
    showEventModal: Accessor<boolean>
    selectedEvent: Accessor<CalendarEvent | null>
    labels: Accessor<CalendarLabel[]>
    setDate: (date: CalendarDate, smallCalendar?: boolean, selectedDay?: boolean) => void
    savedEvents: Accessor<CalendarEvent[]>
    setSavedEvents: (event: CalendarEvent) => void
    setDaySelected: (day: CalendarDate) => void
    setShowEventModal: (state: boolean) => void
    setSelectedEvent: (state: CalendarEvent | null) => void
    setLabels: (label: CalendarLabel[]) => void
    setLabel: (label: CalendarLabel) => void
    _filteredEvents: () => void
}

const CalendarContext = createContext<CalendarContext>()
export const CalendarProvider: Component<Context> = (props) => {
    const defaultState: Calendar = {
        daySelected: moment().day().toLocaleString(),
        showEventModal: false,
        selectedEvent: null,
        labels: [],
        savedEvents: [],
        filteredEvents: [],
        smallCalendarWidget: {
            daySelected: moment().day().toLocaleString(),
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

    const _filteredEvents = () => {
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
        setSavedEvents(parsedEvents)
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
                savedEvents,
                setSavedEvents,
                setDate,
                setDaySelected,
                setShowEventModal,
                setSelectedEvent,
                setLabels,
                setLabel,
                _filteredEvents,
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
