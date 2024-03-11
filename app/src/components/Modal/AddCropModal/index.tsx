import { Switch, Match, createSignal, type Component } from 'solid-js'
import AddCropModalContent from './AddCropModalContent'
import AddCrop from '@components/AddCropButton'
import Modal from '@components/Modal'
import { useAppUIContext } from '@store/context/ui'

const AddCropModal: Component<{
    location: 'sidebar' | 'calendarHeader'
}> = (props) => {
    const { showSidebar } = useAppUIContext()
    const [open, setOpen] = createSignal(false)

    const onCancel = () => {}
    const onSubmit = () => {}

    const handleLocation = () => {
        return (
            <Switch>
                <Match when={props.location === 'sidebar'}>
                    <AddCrop />
                </Match>
                <Match when={props.location === 'calendarHeader'}>
                    <div
                        classList={{
                            'p-4': showSidebar(),
                        }}
                        class="pr-2">
                        <AddCrop />
                    </div>
                </Match>
            </Switch>
        )
    }

    return (
        <Modal
            id="add-crop-modal"
            ariaLabel="Add a new crop"
            title="Add a new crop"
            description="Select an existing crop or create a new crop"
            open={open()}
            setOpen={setOpen}
            onCancel={onCancel}
            onSubmit={onSubmit}
            trigger={handleLocation()}>
            <AddCropModalContent />
        </Modal>
    )
}

export default AddCropModal
