import { debounce } from '@solid-primitives/scheduled'
import { useNavigate } from '@solidjs/router'
import { type Component, createSignal, onCleanup } from 'solid-js'
import MainMenuContent from './MainMenuContent'
import FooterContent from './MainMenuFooterContent'
import { CardContent } from '@components/ui/card'
import { Flex } from '@components/ui/flex'

const MainMenu: Component = () => {
    const [isHovered, setIsHovered] = createSignal(false)
    const [selectMenuActive, setSelectMenuActive] = createSignal(false)

    const navigate = useNavigate()

    let hoverTimer: NodeJS.Timeout

    const handleHover = (hover: boolean) => {
        clearTimeout(hoverTimer) // Clear any existing timer
        console.debug('SelectMenuActive: Hovered -', selectMenuActive())

        hoverTimer = setTimeout(() => {
            if (selectMenuActive()) return
            if (isHovered() === hover) return
            setIsHovered(hover)
            console.debug('MainMenu: Hovered -', isHovered())
        }, 200)
    }

    const toggleSelectMenuActive = (active: boolean) => {
        setSelectMenuActive(active)
    }

    onCleanup(() => clearTimeout(hoverTimer))

    return (
        <aside
            class="fixed top-0 left-0 h-screen bg-base-100 z-9 transition-all duration-500"
            classList={{ 'w-[90px]': !isHovered(), 'w-[225px]': isHovered() }}
            onPointerEnter={() => debounce(handleHover, 200)(true)}
            onPointerLeave={() => debounce(handleHover, 200)(false)}>
            <div class="w-full h-full overflow-x-hidden mt-2 mb-2 mr-1 ml-1">
                <CardContent class="w-full h-full navbar-start items-center text-center pb-4 pr-2 pl-2 pt-2">
                    <Flex
                        class="w-full h-full gap-6"
                        alignItems="baseline"
                        justifyContent="start"
                        flexDirection="col">
                        <MainMenuContent
                            onHover={toggleSelectMenuActive}
                            isHovered={isHovered()}
                            navigate={navigate}
                        />
                        <FooterContent isHovered={isHovered()} navigate={navigate} />
                    </Flex>
                </CardContent>
            </div>
        </aside>
    )
}

export default MainMenu
