import { createSignal, type Component } from 'solid-js'
import Modal from '@components/Modal'
import { Icons } from '@components/ui/icon'
import { useCalendarContext } from '@store/context/calendar'

const CalendarModal: Component = () => {
    const [open, setOpen] = createSignal(false)
    const { setShowEventModal } = useCalendarContext()

    const onCancel = () => {}
    const onSubmit = () => {}

    const handleEditCalendarName = (e: PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowEventModal(true)
    }

    return (
        <Modal
            id="add-crop-modal"
            ariaLabel="Edit Calendar"
            title="Edit Calendar"
            description="Change the parameters of your calendar"
            open={open()}
            setOpen={setOpen}
            onCancel={onCancel}
            onSubmit={onSubmit}
            trigger={
                <Icons.journal
                    onPointerDown={handleEditCalendarName}
                    size={25}
                    class="cursor-pointer text-gray-600 pb-2"
                />
            }>
            {/* <AddCropModalContent /> */}
        </Modal>
    )
}

export default CalendarModal
