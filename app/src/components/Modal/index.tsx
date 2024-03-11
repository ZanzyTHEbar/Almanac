import { JSXElement, ParentComponent } from 'solid-js'
import ModalContent from './ModalContent'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Label } from '@components/ui/label'

export interface ModalEvents {
    onCancel: (e: PointerEvent) => void
    onSubmit: (e: PointerEvent) => void
}

interface ModalProps extends ModalEvents {
    id: string
    ariaLabel: string
    title: string
    description: string
    trigger: JSXElement
    open: boolean
    setOpen: (value: boolean) => void
}

const Modal: ParentComponent<ModalProps> = (props) => {
    return (
        <Dialog
            id={props.id}
            open={props.open}
            onOpenChange={props.setOpen}
            aria-label={props.ariaLabel}>
            <DialogTrigger>{props.trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Label size="2xl">{props.title}</Label>
                    </DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                <ModalContent onCancel={props.onCancel} onSubmit={props.onSubmit}>
                    {props.children}
                </ModalContent>
                <DialogFooter />
            </DialogContent>
        </Dialog>
    )
}

export default Modal
