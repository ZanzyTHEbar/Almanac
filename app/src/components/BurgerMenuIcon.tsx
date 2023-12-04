import { FiMenu } from 'solid-icons/fi'
import { Component, Show } from 'solid-js'
import { Transition } from 'terracotta'
import { useAppUIContext } from '@src/store/context/ui'

const Icon: Component<{
    showSidebar: boolean
    class: string
}> = (props) => {
    const { setShowSidebar } = useAppUIContext()

    const handleClick = () => {
        console.log('clicked')
        console.log(props.showSidebar)
        setShowSidebar(!props.showSidebar)
        console.log(props.showSidebar)
    }

    return (
        <div class={props.class}>
            <Transition
                class={`${props.class} flex flex-1 mb-5`}
                show={props.showSidebar}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
                as="button"
                onClick={handleClick}>
                <FiMenu size={25} class="cursor-pointer" />
            </Transition>
        </div>
    )
}

const BurgerMenuIcon: Component<{
    showSidebar: boolean
    class: string
}> = (props) => {
    return (
        <div class={`${props.class} flex flex-1 mb-5`}>
            <Show when={props.showSidebar}>
                <Icon class={props.class} showSidebar={props.showSidebar} />
            </Show>
        </div>
    )
}

export default BurgerMenuIcon
