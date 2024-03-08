import {
    type Component,
    type Accessor,
    type JSXElement,
    createSignal,
    Show,
    For,
} from 'solid-js'
import { Transition } from 'solid-transition-group'
import { Button } from '@components/ui/button'
import { CardContent } from '@components/ui/card'
import { Flex } from '@components/ui/flex'
import { Label } from '@components/ui/label'

// TODO: Create a onHover menu that lists the pages in vertical order.
// The menu has this structure:
// - logo and name
// - horizontal line
// - calendar selection dropdown
// - menu items
// - horizontal line
// - help docs
// - my profile

const OnHoverContentHandler: Component<{
    isHovered: Accessor<boolean>
    label: string
    icon?: JSXElement
}> = (props) => {
    return (
        <Flex alignItems="start" flexDirection="row">
            <Button
                variant={props.icon ? 'accent' : 'ghost'}
                styles={props.icon ? 'square' : 'circle'}
                classList={{
                    'bg-base-200': !props.icon,
                }}>
                <Show
                    when={props.icon}
                    fallback={<img src="images/logo.png" class="mask mask-circle w-12 h-12" />}>
                    {props.icon}
                </Show>
                <Transition name="burger-fade">
                    <Show when={props.isHovered()}>
                        <Label size="lg" weight="bold">
                            {props.label}
                        </Label>
                    </Show>
                </Transition>
            </Button>
        </Flex>
    )
}

const SideBarMenu: Component = () => {
    const [isHovered, setIsHovered] = createSignal(false)
    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-50 transition-all duration-500"
            classList={{ 'w-[90px]': !isHovered(), 'w-[175px]': isHovered() }}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}>
            <div class="overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="navbar items-center text-center">
                    <Flex class="gap-6" alignItems="start" flexDirection="col">
                        {/* logo - label only on hover */}
                        <OnHoverContentHandler label="Almanac" isHovered={isHovered} />
                        {/* Separator */}
                        <For each={[]}>
                            {(item, index) => (
                                <OnHoverContentHandler
                                    label={item.label}
                                    data-index={index()}
                                    isHovered={isHovered}
                                />
                            )}
                        </For>
                        {/* for loop over menu  items */}
                        {/* Separator */}
                        {/* How-to docs */}
                        {/* your profile */}
                    </Flex>
                </CardContent>
            </div>
        </aside>
    )
}

export default SideBarMenu
