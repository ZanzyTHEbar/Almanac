import { ModalEvents } from './index'
import type { Component } from 'solid-js'
import { Button } from '@components/ui/button'
import { Flex } from '@components/ui/flex'
import { Label } from '@components/ui/label'

interface FormActionsProps extends ModalEvents {
    cancelLabel: string
    submitLabel: string
}

const FormActions: Component<FormActionsProps> = (props) => {
    const handleSubmit = () => {
        console.log('submitting')
        props.onSubmit()
    }

    const handleCancel = (e) => {
        e.stopPropagation()
        props.onCancel()
    }

    return (
        <Flex class="gap-4" alignItems="end" justifyContent="end" flexDirection="row">
            <Button variant="ghost" type="button" onClick={handleCancel}>
                <Label styles="pointer">{props.cancelLabel}</Label>
            </Button>
            <Button variant="accent" type="submit" onClick={handleSubmit}>
                <Label styles="pointer">{props.submitLabel}</Label>
            </Button>
        </Flex>
    )
}

export default FormActions
