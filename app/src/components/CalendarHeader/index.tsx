import dayjs from 'dayjs'
import { useCalendarContext } from '@src/store/context/calendar'

const CalendarHeader = () => {
    const { monthIndex, setMonthIndex } = useCalendarContext()

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex()! - 1)
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex()! + 1)
    }
    const handleReset = () => {
        setMonthIndex(
            monthIndex()! === dayjs().month() ? monthIndex()! + Math.random() : dayjs().month(),
        )
    }
    return (
        <header
            class="px-4 py-2 flex items-center"
            style={{
                'padding-top': '20px',
            }}>
            <img src="/images/logo.png" alt="calendar" class="mr-2 w-12 h-12" />
            <h1 class="mr-10 text-xl text-gray-500 fond-bold">Outlook Knight</h1>
            <button
                onClick={handleReset}
                class="border rounded py-2 px-4 mr-5 shadow-md hover:shadow-xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner">
                Today
            </button>
            <button onClick={handlePrevMonth}>
                <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
            </button>
            <h2 class="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex()!)).format('MMMM YYYY')}
            </h2>
        </header>
    )
}

export default CalendarHeader
