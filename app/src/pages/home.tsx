import { Component, Show } from 'solid-js'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import Header from '@components/Header'
import Month from '@components/Month'
import Sidebar from '@components/Sidebar'
import { Card, CardContent } from '@components/ui/card'
import { useCalendarContext } from '@store/context/calendar'
import { useAppContextMain } from '@store/context/main'
import { useAppUIContext } from '@store/context/ui'

// TODO: Add search bar to filter crops
// TODO: Add resize event listener to resize calendar on sidebar open/close
// TODO: Fix sidebar animation

const BurgerMenu: Component<{
    class: string
}> = (props) => {
    const { showSidebar } = useAppUIContext()
    return (
        <div class={`${props.class} flex flex-1 mb-5`}>
            <Show when={!showSidebar()}>
                <BurgerMenuIcon class={props.class} />
            </Show>
        </div>
    )
}

export default function Main() {
    const { showEventModal } = useCalendarContext()
    const { setShowSidebar, showSidebar } = useAppUIContext()

    const Main = () => (
        <Card class="w-screen rounded-none bg-primary-300 h-screen">
            <Header />
            <CardContent class="flex flex-1">
                <Sidebar>
                    <div onClick={() => setShowSidebar(true)}>
                        <BurgerMenu class="pt-1 justify-start items-start" />
                    </div>
                </Sidebar>
                <Month />
            </CardContent>
        </Card>
    )

    return <Main />
}
