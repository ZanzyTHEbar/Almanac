import type { Component } from 'solid-js'
import AddCrop from '@components/AddCropButton'
import Modal from '@components/Modal'

const AddCropModal: Component = () => {
    const onCancel = () => {}
    const onSubmit = () => {}

    return (
        <Modal
            id="add-crop-modal"
            ariaLabel="Add a new crop"
            title="Add a new crop"
            description="Select an existing crop or create a new crop"
            onCancel={onCancel}
            onSubmit={onSubmit}>
            <AddCrop />
        </Modal>
    )
}

export default AddCropModal
