import {
    FaSolidTrashCan,
    FaRegularBookmark,
    FaSolidCheck,
    FaRegularClock,
    FaSolidT,
} from 'solid-icons/fa'
import { RiEditorDraggable } from 'solid-icons/ri'
import { createSignal, For, Show } from 'solid-js'
import CloseIcon from '@components/CloseIcon'
import SegmentIcon from '@components/SegmentIcon'
import { useCalendarContext } from '@src/store/context/calendar'
import { CalendarEvent, CalendarEventContent } from '@static/types/interfaces'

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']

export default function EventModal() {
    const {
        setLabels,
        setShowEventModal,
        daySelected,
        setSavedEvents,
        selectedEvent,
        savedEvents,
    } = useCalendarContext()

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

        console.log(calendarEvent)
        setSavedEvents(calendarEvent)
        // TODO: Change this to localForage or Tauri Store
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents()))

        setShowEventModal(false)
    }
    return (
        <div class="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form class="bg-white rounded-lg shadow-2xl w-1/3">
                <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span class="text-gray-400">
                        <RiEditorDraggable fill="#000000" size={25} />
                    </span>
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
                                class="text-gray-400 cursor-pointer">
                                <FaSolidTrashCan fill="#FF0000" size={15} />
                            </span>
                        </Show>

                        <button
                            type="button"
                            class="close_button rounded-full"
                            onClick={() => setShowEventModal(false)}>
                            <CloseIcon />
                        </button>
                    </div>
                </header>
                <div class="p-3">
                    <div class="grid grid-cols-1/5 items-end gap-y-7">
                        <div class="pb-3">
                            <span class="text-gray-400">
                                <FaSolidT fill="#000000" size={25} />
                            </span>
                        </div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title()}
                            required
                            class="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span class="text-gray-400">
                            <FaRegularClock fill="#000000" size={25} />
                        </span>
                        <p class="mr-44">{daySelected().format('dddd, MMMM DD')}</p>
                        <span class="pb-2">
                            <SegmentIcon fill="text-gray-800" />
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description()}
                            required
                            class="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span class="text-gray-400">
                            <FaRegularBookmark fill="#000000" size={25} />
                        </span>
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
                                        <Show when={selectedLabel() === lblClass}>
                                            <span class="text-white text-sm">
                                                <FaSolidCheck fill="#FFFFFF" size={15} />
                                            </span>
                                        </Show>
                                    </span>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
                <footer class="flex justify-end border-t p-3 mt-5">
                    <button type="submit" onClick={handleSubmit} class="submit_button">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}
