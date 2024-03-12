import { createEffect, createSignal } from 'solid-js'
import MonthCalendar from '@components/Calendar/MonthCalendar'
import SidebarContent from '@components/Sidebar/Content'
import Sidebar from '@components/Sidebar/index'
import { Card, CardContent } from '@components/ui/card'
import PageWrapper from '@src/pages/PageWrapper'
import { useCalendarContext } from '@store/context/calendar'

// TODO: Add journal
// TODO: Add Tasks with Todo list

export default function Main() {
    const { getMonth, selectedCalendar } = useCalendarContext()
    const [currentMonth, setCurrentMonth] = createSignal(getMonth())

    createEffect(() => {
        if (!selectedCalendar()) return
        setCurrentMonth(getMonth(selectedCalendar()!.currentMonthIdx))
    })

    return (
        <PageWrapper>
            <Card class="overflow-auto border-none w-auto rounded-none bg-primary-300 h-screen">
                <CardContent class="flex flex-1">
                    <Sidebar>
                        <SidebarContent />
                    </Sidebar>
                    <MonthCalendar month={currentMonth()} />
                </CardContent>
            </Card>
        </PageWrapper>
    )
}
