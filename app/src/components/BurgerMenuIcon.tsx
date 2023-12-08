import { FiMenu } from 'solid-icons/fi'
import { Component } from 'solid-js'
import { Transition } from 'terracotta'

const BurgerMenuIcon: Component<{
    class: string
}> = (props) => {
    return (
        <div class={props.class}>
            <Transition
                show={true}
                class={`${props.class} flex flex-1 mb-5`}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 ">
                <FiMenu size={25} class="cursor-pointer" />
            </Transition>
        </div>
    )
}

export default BurgerMenuIcon
