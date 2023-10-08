import CreateEventButton from '@components/CreateEventButton'
import Labels from '@components/Labels'
import SmallCalendar from '@components/SmallCalendar'

const Sidebar = () => {
    return (
        <aside
            class="border p-5 w-64"
            style={{
                'border-top-left-radius': '8px',
                'border-top-right-radius': '8px',
                'border-bottom-left-radius': '8px',
                'border-bottom-right-radius': '8px',
            }}>
            <CreateEventButton />
            <SmallCalendar />
            <Labels />
        </aside>
    )
}

export default Sidebar
