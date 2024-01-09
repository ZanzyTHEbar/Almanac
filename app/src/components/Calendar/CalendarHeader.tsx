import { Show, Component } from 'solid-js'
import { Button } from '@components/ui/button'
import { CardHeader } from '@components/ui/card'
import { Icons } from '@components/ui/icon'
import { useCalendarContext } from '@store/context/calendar'

const CalendarHeader: Component<{
    id: 'calendar' | 'widget'
}> = (props) => {
    //const { currentMonthIdx, setCurrentMonthIdx } = useCalendarContext()

    /* const handleMonthIndex = (idx: number) => {
        setCurrentMonthIdx(idx)
    } */

    return (
        <>
            <div class="card rounded-none">
                {/* Editable Calendar title */}
                {/* Export Calendar icon */}
                {/* Settings */}
                {/* Add Crop button */}
            </div>
            <div class="flex flex-1 flex-row gap-4 p-2">
                {/* Today button */}
                <Button /* onClick={() => handleMonthIndex(currentMonthIdx() - 1)} */>
                    <Icons.chevronLeft size={25} class="text-gray-600 mx-2" />
                </Button>
                <Button /* onClick={() => handleMonthIndex(currentMonthIdx() + 1)} */>
                    <Icons.chevronRight size={25} class="text-gray-600 mx-2" />
                </Button>
                {/* Dropdown to select month and year */}
                {/* task filter */}
                {/* month, timeline, year calendar picker */}
                {/* customize button */}
            </div>
        </>
    )
}

export default CalendarHeader

/* <Show when={props.id === 'calendar'}>
    <CardHeader class="flex w-full justify-start items-center">
        <img
            src="images/sprout.png"
            alt="calendar"
            class="mr-2"
        />
        <h1 class="mr-10 text-xl text-gray-500 fond-bold">Almanac</h1>
    </CardHeader>
</Show> */
