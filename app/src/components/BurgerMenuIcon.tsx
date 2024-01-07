import { FiMenu } from 'solid-icons/fi'
import { Component, ComponentProps, splitProps } from 'solid-js'
import { Transition } from 'terracotta'
import { cn } from '@src/lib/utils'

const BurgerMenuIcon: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div class={props.class} {...rest}>
            <Transition
                show={true}
                class={cn(props.class)}
                enter="transform transition duration-400"
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

const BurgerMenu: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div class={cn('flex flex-1 mb-5', props.class)} {...rest}>
            <BurgerMenuIcon class={props.class} />
        </div>
    )
}

export { BurgerMenuIcon, BurgerMenu }
