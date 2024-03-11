import { FiMenu } from 'solid-icons/fi'
import { Component, ComponentProps, Show, splitProps } from 'solid-js'
import { Transition } from 'terracotta'
import { Label } from '@components/ui/label'
import { cn } from '@src/lib/utils'

interface BurgerMenuProps extends ComponentProps<'div'> {
    label: string
    show: boolean
}

const BurgerMenuIcon: Component<ComponentProps<'div'>> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <div class={cn('', props.class)} {...rest}>
            <Transition
                show={true}
                class={cn(props.class)}
                enter="transform transition duration-400"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-400 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 ">
                <FiMenu size={25} class="cursor-pointer" />
            </Transition>
        </div>
    )
}

const BurgerMenu: Component<BurgerMenuProps> = (props) => {
    const [, rest] = splitProps(props, ['class', 'label', 'show'])
    return (
        <div class={cn('flex', props.class)} {...rest}>
            <Show when={props.show}>
                <Label for="burger-icon" weight="bold" size="4xl">
                    {props.label}
                </Label>
            </Show>
            <BurgerMenuIcon id="burger-icon" class={props.class} />
        </div>
    )
}

export { BurgerMenuIcon, BurgerMenu }
