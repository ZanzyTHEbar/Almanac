import { Dialog as DialogPrimitive } from '@kobalte/core'
import { TbX } from 'solid-icons/tb'
import { splitProps } from 'solid-js'
import type { Component, ComponentProps } from 'solid-js'

import { cn } from '@src/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger: Component<DialogPrimitive.DialogTriggerProps> = (props) => {
    const [, rest] = splitProps(props, ['children'])
    return <DialogPrimitive.Trigger {...rest}>{props.children}</DialogPrimitive.Trigger>
}

//* fixed inset-0 z-50 flex items-start justify-center sm:items-center
const DialogPortal: Component<DialogPrimitive.DialogPortalProps> = (props) => {
    const [, rest] = splitProps(props, ['children'])
    return (
        <DialogPrimitive.Portal {...rest}>
            <div class="modal modal-open modal-bottom sm:modal-middle">{props.children}</div>
        </DialogPrimitive.Portal>
    )
}

//* bg-black/25
const DialogOverlay: Component<DialogPrimitive.DialogOverlayProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <DialogPrimitive.Overlay
            class={cn(
                'modal-backdrop data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm',
                props.class,
            )}
            {...rest}
        />
    )
}

const DialogContent: Component<DialogPrimitive.DialogContentProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'children'])
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                class={cn(
                    'modal-box data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] fixed z-50 grid w-full max-w-lg gap-4 border p-6 shadow-lg duration-200',
                    props.class,
                )}
                {...rest}>
                {props.children}
                <DialogPrimitive.CloseButton class="ring-offset-background focus:ring-ring data-[expanded]:bg-accent data-[expanded]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                    <TbX class="h-4 w-4" />
                    <span class="sr-only">Close</span>
                </DialogPrimitive.CloseButton>
            </DialogPrimitive.Content>
        </DialogPortal>
    )
}

const DialogHeader: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div
            class={cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class)}
            {...rest}
        />
    )
}

const DialogAction: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div
            class={cn('modal-action flex flex-col space-y-1.5 text-center sm:text-left', props.class)}
            {...rest}
        />
    )
}

const DialogFooter: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div
            class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', props.class)}
            {...rest}
        />
    )
}

const DialogTitle: Component<DialogPrimitive.DialogTitleProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <DialogPrimitive.Title
            class={cn('text-lg font-bold leading-none tracking-wider', props.class)}
            {...rest}
        />
    )
}

const DialogDescription: Component<DialogPrimitive.DialogDescriptionProps> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <DialogPrimitive.Description
            class={cn('text-muted-foreground text-sm', props.class)}
            {...rest}
        />
    )
}

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogAction,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
