import { type Component, createSignal } from 'solid-js'
import { Transition, TransitionChild } from 'terracotta'
import { CardContent } from '@components/ui/card'

// TODO: Create a onHover menu that lists the pages in vertical order.
// The menu has this structure:
// - logo and name
// - horizontal line
// - calendar selection dropdown
// - menu items
// - horizontal line
// - help docs
// - my profile

const SideBarMenu: Component = () => {
    const [isHovered, setIsHovered] = createSignal(false)
    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-50 transition-width duration-300"
            classList={{ 'w-[50px]': !isHovered(), 'w-[175px]': isHovered() }}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}>
            <div class="overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="items-center text-center">
                    {/* for loop over menu  items */}
                    hello world
                </CardContent>
            </div>
        </aside>
    )
}

export default SideBarMenu

/* <Transition show={isHovered()} appear={true}>
    <TransitionChild
        enter="transform transition ease-out duration-400"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transform transition ease-in duration-400"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full">
        
    </TransitionChild>
</Transition> */
