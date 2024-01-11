import Month from '@components/Calendar/Month'
import SidebarContent from '@components/Sidebar/Content'
import Sidebar from '@components/Sidebar/index'
import { Card, CardContent } from '@components/ui/card'
import PageWrapper from '@src/pages/PageWrapper'
import { useCalendarContext } from '@store/context/calendar'

// TODO: Add journal
// TODO: Add Tasks with Todo list

export default function Main() {
    const { getMonth } = useCalendarContext()

    const Main = () => (
        <PageWrapper>
            <Card class="overflow-auto border-none w-auto rounded-none bg-primary-300 h-screen">
                <CardContent class="flex flex-1">
                    <Sidebar>
                        <SidebarContent />
                    </Sidebar>
                    <Month month={getMonth()} />
                </CardContent>
            </Card>
        </PageWrapper>
    )

    return <Main />
}
