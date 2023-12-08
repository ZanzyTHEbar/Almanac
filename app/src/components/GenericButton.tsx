import { Component, JSXElement, createSignal } from 'solid-js'

const CreateEventButton: Component<{
    onClick: () => void
    content: JSXElement | string
}> = (props) => {
    const [state, setState] = createSignal(false)

    const handleClick = () => {
        setState(!state())
        props.onClick()
    }

    return (
        <button
            onClick={handleClick}
            class="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner btn btn-primary fc-next-button">
            <span class="flex flex-row items-center">{props.content}</span>
        </button>
    )
}

export default CreateEventButton
