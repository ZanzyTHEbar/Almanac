import Month from '@components/Calendar/Month'
import Header from '@components/Header'
import SidebarContent from '@components/Sidebar/Content'
import Sidebar from '@components/Sidebar/index'
import { Card, CardContent } from '@components/ui/card'
import { useCalendarContext } from '@store/context/calendar'

// TODO: Add journal
// TODO: Add Tasks with Todo list

export default function Main() {
    const { getMonth } = useCalendarContext()

    const Main = () => (
        <Card class="ml-[50px] overflow-auto border-none w-screen rounded-none bg-primary-300 h-screen">
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
