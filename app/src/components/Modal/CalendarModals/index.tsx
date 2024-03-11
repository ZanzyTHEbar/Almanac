import { Switch, Match, createSignal, type Component } from 'solid-js'
import CalendarHeaderModalContent from './CalendarHeaderModalContent'
import Modal from '@components/Modal'
import { Icons } from '@components/ui/icon'
import { useCalendarContext } from '@store/context/calendar'

type Locations = 'header' | 'day'

const CalendarModal: Component<{
    location: Locations
}> = (props) => {
    const [open, setOpen] = createSignal(false)
    const { setShowEventModal } = useCalendarContext()

    const onCancel = () => setOpen(false)

    const onSubmit = () => {
        // TODO: implement call to save to store
        setOpen(false)
    }

    const handleEditCalendarName = (e: PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowEventModal(true)
    }

    const handleContent = () => {
        return (
            <Switch>
                <Match when={props.location === 'header'}>
                    <CalendarHeaderModalContent />
                </Match>
            </Switch>
        )
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
            {handleContent()}
        </Modal>
    )
}

export default CalendarModal
