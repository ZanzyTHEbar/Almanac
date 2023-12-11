import { Component, Show } from 'solid-js'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import FullCalendar from '@components/FullCalendar'
import Sidebar from '@components/Sidebar'
import { useCalendarContext } from '@src/store/context/calendar'
import { useAppContextMain } from '@src/store/context/main'
import { useAppUIContext } from '@src/store/context/ui'

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
        <div class="calendar-main">
            <div class="mt-8 flex flex-1 grow flex-row justify-center ">
                <Sidebar />
                <div class="shadow-md border rounded-[8px] flex flex-1 grow w-full h-[97vh] justify-evenly overflow-y-auto">
                    <div
                        class={`rounded-[8px] w-full h-[97vh] ml-3 ${
                            showSidebar() ? 'flex flex-1 grow' : ''
                        }`}>
                        <div onClick={() => setShowSidebar(true)}>
                            <BurgerMenu class="pt-1 justify-start items-start" />
                        </div>
                        <div class="flex flex-1 w-full h-[97vh]">
                            <FullCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return <Main />
}
