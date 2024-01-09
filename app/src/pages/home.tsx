import Header from '@components/Header'
import Month from '@components/Calendar/Month'
import Sidebar from '@components/Sidebar'
import SidebarContent from '@components/Sidebar/Content'
import { Card, CardContent } from '@components/ui/card'
import { useCalendarContext } from '@store/context/calendar'
import { useAppContextMain } from '@store/context/main'
import { useAppUIContext } from '@store/context/ui'

// TODO: Add journal
// TODO: Add Tasks with Todo list

export default function Main() {
    const { getMonth } = useCalendarContext()

    const Main = () => (
        <Card class="w-screen rounded-none bg-primary-300 h-screen">
            <Header />
            <CardContent class="flex flex-1">
                <Sidebar>
                    <SidebarContent />
                </Sidebar>
                <Month month={getMonth()} />
            </CardContent>
        </Card>
    )

    return <Main />
}
