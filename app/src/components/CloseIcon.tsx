import { JSX } from 'solid-js'

const CloseIcon = (props: JSX.IntrinsicElements['svg']) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={props.fill || 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

export default CloseIcon