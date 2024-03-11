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

/* 

const calendarContent: CalendarEventContent = {
    title: title(),
    description: description(),
    date: daySelected().valueOf(),
    end: daySelected().valueOf(),
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

import { CalendarEvent, CalendarEventContent } from '@static/types/interfaces'
import SegmentIcon from '@components/SegmentIcon'
import { FaSolidTrashCan, FaRegularBookmark, FaSolidCheck, FaRegularClock } from 'solid-icons/fa'

 const [title, setTitle] = createSignal(selectedEvent() ? selectedEvent()!.payload.title : '')

    const [description, setDescription] = createSignal(
        selectedEvent() ? selectedEvent()!.payload.description : '',
    )


const EditEvent = () => {
        return (
            <>
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
            </>
        )
    }

const Description = () => {
        return (
            <>
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
            </>
        )
    }

    const BookMark = () => {
        return (
            <>
                <span class="text-gray-400">
                    <FaRegularBookmark fill="#000000" size={25} />
                </span>
                <div class="flex gap-x-2">
                    <For each={labelsClasses}>
                        {(lblClass) => (
                            <span
                                onClick={() =>
                                    setSelectedLabel(labelsClasses.find((lbl) => lbl === lblClass))
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
            </>
        )
    }

    const ModalHeader = () => {
        return (
            <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <EditEvent />
            </header>
        )
    }


*/
