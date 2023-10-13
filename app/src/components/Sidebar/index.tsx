import CreateEventButton from '@components/CreateEventButton'
import Labels from '@components/Labels'
import SmallCalendar from '@components/SmallCalendar'

const Sidebar = () => {
    return (
        <aside class="border p-5 w-64 rounded-[8px]">
            <CreateEventButton />
            <SmallCalendar />
            <Labels />
        </aside>
    )
}

export default Sidebar
