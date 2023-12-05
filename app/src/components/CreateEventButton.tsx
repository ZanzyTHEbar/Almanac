import PlusIcon from '@components/PlusIcon'
import { useCalendarContext } from '@src/store/context/calendar'

const CreateEventButton = () => {
    const { setShowEventModal } = useCalendarContext()
    return (
        <button
            onClick={() => setShowEventModal(true)}
            class="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner btn btn-primary fc-next-button">
            <span class="flex flex-row items-center">
                <PlusIcon
                    color="#ffffffe3"
                    size={30}
                    class="text-center justify-around content-center"
                />
                <p class="mt-3 pl-2 text-[#ffffffe3]">Add Crop</p>
            </span>
        </button>
    )
}

export default CreateEventButton
