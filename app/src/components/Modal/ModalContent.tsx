import type { ModalEvents } from '.'
import type { ParentComponent } from 'solid-js'
import FormActions from '@components/Modal/AddCropModal/FormActions'
import { DialogAction } from '@components/ui/dialog'

const ModalContent: ParentComponent<ModalEvents> = (props) => {
    return (
        <DialogAction>
            <form class="p-2" method="dialog">
                {props.children}
                <FormActions onCancel={props.onCancel} onSubmit={props.onSubmit} />
            </form>
        </DialogAction>
    )
}

export default ModalContent
