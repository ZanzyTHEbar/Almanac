import { FiEdit } from 'solid-icons/fi'
import { Show, createSignal, Component, onMount } from 'solid-js'
import { getCalendarById, updateCalendar } from '@src/db/calendar'

const CalendarHeader: Component<{
    id: string | undefined
}> = (props) => {
    const [edit, setEdit] = createSignal(false)
    const [calendarName, setCalendarName] = createSignal('')

    const updateName = async () => {
        if (!props.id) {
            return
        }

        const calendar = await getCalendarById(props.id)
        setCalendarName(calendar?.calendar_name || 'Calendar')
    }

    const saveName = async () => {
        if (!props.id) {
            return
        }
        const calendar = await getCalendarById(props.id)
        if (!calendar) {
            return
        }

        calendar.calendar_name = calendarName()
        updateCalendar(props.id, calendar)
    }

    onMount(() => {
        updateName()
    })

    return (
        <header class="flex w-full justify-start items-center">
            <span class="flex flex-row justify-center items-center gap-1">
                <h1>{calendarName()}</h1>
                <Show when={!edit()}>
                    <button onClick={() => setEdit(true)}>
                        <FiEdit
                            class="cursor-pointer pb-5"
                            onClick={() => {
                                setEdit(!edit)
                            }}
                            size={25}
                        />
                    </button>
                </Show>
            </span>
            <Show when={edit()}>
                <input
                    type="text"
                    class="border-2 border-gray-300 rounded-md"
                    value={calendarName()}
                    onInput={(e) => {
                        setCalendarName(e.currentTarget.value)
                    }}
                    onChange={() => {
                        saveName()
                        setEdit(false)
                    }}
                />
            </Show>
        </header>
    )
}

{
    /* 
<header class="flex w-full justify-start items-center">
    <img src="/images/logo_seedling.png" alt="calendar" class="w-[8%] h-[8%] mr-2" />
    <h1 class="mr-10 text-xl text-gray-500 fond-bold">Outlook Knight</h1>
</header> 
*/
}

export default CalendarHeader
