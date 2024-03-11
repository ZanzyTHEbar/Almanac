import { ModalEvents } from '..'
import type { Component } from 'solid-js'
import { Button } from '@components/ui/button'
import { Flex } from '@components/ui/flex'
import { Label } from '@components/ui/label'

const FormActions: Component<ModalEvents> = (props) => {
    return (
        <Flex class="gap-4" alignItems="end" justifyContent="end" flexDirection="row">
            <Button variant="ghost" type="button" onPointerDown={props.onCancel}>
                <Label styles="pointer">Cancel</Label>
            </Button>
            <Button variant="accent" type="submit" onPointerDown={props.onSubmit}>
                <Label styles="pointer">Save</Label>
            </Button>
        </Flex>
    )
}

export default FormActions
