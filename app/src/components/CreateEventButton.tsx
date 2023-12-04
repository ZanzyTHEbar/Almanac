import { useCalendarContext } from '@src/store/context/calendar'

const CreateEventButton = () => {
    const { setShowEventModal } = useCalendarContext()
    return (
        <button
            onClick={() => setShowEventModal(true)}
            // border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner
            class="btn btn-primary fc-next-button">
            <img src="/images/plus.svg" alt="create_event" class="plus-color w-7 h-7" />
            <span class="pl-3 pr-7">Event</span>
        </button>
    )
}

export default CreateEventButton
