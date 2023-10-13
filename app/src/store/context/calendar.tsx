import dayjs from 'dayjs'
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
import { Calendar, CalendarEvent, CalendarLabel } from '@static/types/interfaces'

interface CalendarContext {
    filteredEvents: Accessor<CalendarEvent[]>
    monthIndex: Accessor<number | null>
    smallCalendarMonth: Accessor<number | null>
    daySelected: Accessor<dayjs.Dayjs>
    showEventModal: Accessor<boolean>
    selectedEvent: Accessor<CalendarEvent | null>
    labels: Accessor<CalendarLabel[]>
    savedEvents: Accessor<CalendarEvent[]>
    setSavedEvents: (action: CalendarEvent) => void
    setMonthIndex: (index: number) => void
    setSmallCalendarMonth: (index: number) => void
    setDaySelected: (day: dayjs.Dayjs) => void
    setShowEventModal: (state: boolean) => void
    setSelectedEvent: (state: CalendarEvent | null) => void
    setLabels: (label: CalendarLabel[]) => void
    setLabel: (label: CalendarLabel) => void
    _filteredEvents: () => void
}

const CalendarContext = createContext<CalendarContext>()
export const CalendarProvider: Component<Context> = (props) => {
    const defaultState: Calendar = {
        monthIndex: dayjs().month(),
        smallCalendarMonth: null,
        daySelected: dayjs(),
        showEventModal: false,
        selectedEvent: null,
        labels: [],
        filteredEvents: [],
        savedEvents: [],
    }

    const [state, setState] = createStore<Calendar>(defaultState)
    const appState = createMemo(() => state)

    //#region Actions

    const setMonthIndex = (index: number) => {
        setState(
            produce((s) => {
                s.monthIndex = index
            }),
        )
    }

    const setSmallCalendarMonth = (index: number) => {
        setState(
            produce((s) => {
                s.smallCalendarMonth = index
            }),
        )
    }

    const setDaySelected = (day) => {
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

    const setSavedEvents = (action: CalendarEvent) => {
        console.log(action)
        console.log(appState().savedEvents)
        setState(
            produce((s) => {
                const currentEvents = s.savedEvents

                switch (action.type) {
                    case 'push':
                        return currentEvents.push(action)
                    case 'update':
                        return currentEvents.map((evt) => (evt.uuid === action.uuid ? evt : action))
                    case 'delete':
                        return currentEvents.filter((evt) => evt.uuid !== action.uuid)
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
                if (s.smallCalendarMonth !== null) {
                    setMonthIndex(s.smallCalendarMonth)
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

    const monthIndex = createMemo(() => appState().monthIndex)
    const smallCalendarMonth = createMemo(() => appState().smallCalendarMonth)
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
                monthIndex,
                smallCalendarMonth,
                daySelected,
                showEventModal,
                selectedEvent,
                labels,
                savedEvents,
                setSavedEvents,
                setMonthIndex,
                setSmallCalendarMonth,
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
