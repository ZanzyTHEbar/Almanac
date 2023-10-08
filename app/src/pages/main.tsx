import { createSignal, createEffect, Show } from 'solid-js'
import CalendarHeader from '@components/CalendarHeader'

import EventModal from '@components/EventModal'
import MSLogin from '@components/MSLogin'
import Month from '@components/Month'
import Sidebar from '@components/Sidebar'
import { useCalendarContext } from '@src/store/context/calendar'
import { useAppContextMain } from '@src/store/context/main'
import { getMonthDays } from '@utils/index'

export default function Main() {
    /* const [navState, setNavState] = React.useState({
        dashboard: true,
    });
        settings: false,

    const handleNavChange = (event) => {
        setNavState({
            ...navState,
            dashboard: !navState.dashboard,
            settings: !navState.settings,
        });
        console.log(event.currentTarget);
    }; */

    const [currentMonth, setCurrentMonth] = createSignal(getMonthDays())
    const { monthIndex, showEventModal } = useCalendarContext()
    const { loggedIn } = useAppContextMain()

    createEffect(() => {
        setCurrentMonth(getMonthDays(monthIndex()!))
    })

    const Main = () => (
        <main>
            <Show when={showEventModal()}>
                <div class="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div class="absolute inset-0 z-50 flex justify-center items-center">
                        <div class="bg-white rounded-lg shadow-2xl w-1/3">
                            <EventModal />
                        </div>
                    </div>
                </div>
            </Show>
            <div
                class="h-fit flex flex-col"
                style={{
                    height: '97vh',
                }}>
                <CalendarHeader />
                <div
                    class="flex flex-1"
                    style={{
                        'border-top-left-radius': '8px',
                        'border-top-right-radius': '8px',
                    }}>
                    <Sidebar />
                    <Month month={currentMonth()} />
                </div>
            </div>
        </main>
    )

    return <Main />
}

/* <Show when={loggedIn()} fallback={<MSLogin />}>
   </Show> */
