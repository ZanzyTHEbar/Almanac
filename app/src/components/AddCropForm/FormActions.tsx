import { Component } from 'solid-js'

const FormActions: Component<{
    onRestoreDefaults: () => void
    onSubmit: (e: any) => void
}> = (props) => {
    const handleSubmit = (e) => {
        console.log('submitting')
        props.onSubmit(e)
    }

    const handleRestoreDefaults = (e) => {
        e.stopPropagation()
        props.onRestoreDefaults()
    }

    return (
        <div class="form-actions">
            <button type="button" onClick={handleRestoreDefaults}>
                Restore defaults
            </button>
            <button type="submit" onClick={handleSubmit}>
                Schedule
            </button>
        </div>
    )
}

export default FormActions
