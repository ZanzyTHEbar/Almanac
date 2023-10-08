import { createSignal, For, Show } from 'solid-js'
import { useCalendarContext } from '@src/store/context/calendar'
import { CalendarEvent, CalendarEventContent } from '@static/types/interfaces'

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']

export default function EventModal() {
    const { setShowEventModal, daySelected, setSavedEvents, selectedEvent } = useCalendarContext()

    const [title, setTitle] = createSignal(selectedEvent() ? selectedEvent()!.payload.title : '')
    const [description, setDescription] = createSignal(
        selectedEvent() ? selectedEvent()!.payload.description : '',
    )
    const [selectedLabel, setSelectedLabel] = createSignal(
        selectedEvent()
            ? labelsClasses.find((lbl) => lbl === selectedEvent()!.label)
            : labelsClasses[0],
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        const calendarContent: CalendarEventContent = {
            title: title(),
            description: description(),
            date: daySelected().valueOf(),
        }

        const calendarEvent: CalendarEvent = {
            type: selectedEvent() ? 'update' : 'push',
            label: selectedLabel()!,
            uuid: selectedEvent() ? selectedEvent()!.uuid : Date.now(),
            payload: calendarContent,
        }

        setSavedEvents(calendarEvent)

        setShowEventModal(false)
    }
    return (
        <div class="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form class="bg-white rounded-lg shadow-2xl w-1/3">
                <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span class="material-icons-outlined text-gray-400">drag_handle</span>
                    <div>
                        <Show when={selectedEvent()}>
                            <span
                                onClick={() => {
                                    setSavedEvents({
                                        type: 'delete',
                                        label: selectedEvent()!.label,
                                        uuid: selectedEvent()!.uuid,
                                        payload: selectedEvent()!.payload,
                                    })
                                    setShowEventModal(false)
                                }}
                                class="material-icons-outlined text-gray-400 cursor-pointer">
                                delete
                            </span>
                        </Show>

                        <button onClick={() => setShowEventModal(false)}>
                            <span class="material-icons-outlined text-gray-400">close</span>
                        </button>
                    </div>
                </header>
                <div class="p-3">
                    <div class="grid grid-cols-1/5 items-end gap-y-7">
                        <div />
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title()}
                            required
                            class="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span class="material-icons-outlined text-gray-400">schedule</span>
                        <p>{daySelected().format('dddd, MMMM DD')}</p>
                        <span class="material-icons-outlined text-gray-400">segment</span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description()}
                            required
                            class="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span class="material-icons-outlined text-gray-400">bookmark_border</span>
                        <div class="flex gap-x-2">
                            <For each={labelsClasses}>
                                {(lblClass) => (
                                    <span
                                        onClick={() =>
                                            setSelectedLabel(
                                                labelsClasses.find((lbl) => lbl === lblClass),
                                            )
                                        }
                                        class={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                                        {selectedLabel() === lblClass && (
                                            <span class="material-icons-outlined text-white text-sm">
                                                check
                                            </span>
                                        )}
                                    </span>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
                <footer class="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white hover:shadow-xl focus:bg-blue-700 transition duration-200 ease-in focus:shadow-inner">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}
