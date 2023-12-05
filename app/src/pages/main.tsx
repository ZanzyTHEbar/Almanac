import { Show } from 'solid-js'
import BurgerMenuIcon from '@components/BurgerMenuIcon'
import CalendarHeader from '@components/CalendarHeader'
import EventModal from '@components/EventModal'
import FullCalendar from '@components/FullCalendar'
import Sidebar from '@components/Sidebar'
import { useCalendarContext } from '@src/store/context/calendar'
import { useAppContextMain } from '@src/store/context/main'
import { useAppUIContext } from '@src/store/context/ui'

export default function Main() {
    const { showEventModal } = useCalendarContext()
    const { showSidebar } = useAppUIContext()

    const Main = () => (
        <div class="calendar-main">
            <Show when={showEventModal()}>
                <div class="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div class="absolute inset-0 z-50 flex justify-center items-center">
                        <div class="bg-[#e5e7eb] rounded-lg shadow-2xl w-1/3">
                            <EventModal />
                        </div>
                    </div>
                </div>
            </Show>
            <div class="mt-8 flex flex-1 grow flex-row justify-center ">
                <Show when={showSidebar()}>
                    <Sidebar showSidebar={showSidebar()} />
                </Show>
                <div class="shadow-md border rounded-[8px] flex flex-1 grow w-[97%] h-[97vh] justify-evenly overflow-y-auto">
                    <div
                        class={`w-[97%] h-[97vh] p-3 ${
                            showSidebar() ? 'flex flex-1 grow' : ''
                        } rounded-[8px]`}>
                        <Show when={!showSidebar()}>
                            <BurgerMenuIcon
                                class="pt-1 justify-start items-start"
                                showSidebar={!showSidebar()}
                            />
                        </Show>
                        <div class="flex flex-1 w-[97%] h-[97vh]">
                            <FullCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return <Main />
}

/* <Show when={loggedIn()} fallback={<MSLogin />}>
   </Show> */
