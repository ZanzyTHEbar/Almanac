import { JSX } from 'solid-js'

const SegmentIcon = (props: JSX.IntrinsicElements['svg']) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            stroke="currentColor"
            width="24"
            fill={props.fill || 'none'}
            {...props}>
            <path d="M360-240v-80h480v80H360Zm0-200v-80h480v80H360ZM120-640v-80h720v80H120Z" />
        </svg>
    )
}

export default SegmentIcon
