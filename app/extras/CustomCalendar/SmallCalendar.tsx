import dayjs from 'dayjs'
import { For, createEffect, createSignal } from 'solid-js'
import { useCalendarContext } from '@src/store/context/calendar'
import { getMonthDays } from '@utils/index'

const SmallCalendar = () => {
    const [currentMonthIdx, setCurrentMonthIdx] = createSignal(dayjs().month())
    const [currentMonth, setCurrentMonth] = createSignal(getMonthDays())
    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useCalendarContext()

    createEffect(() => {
        setCurrentMonth(getMonthDays(currentMonthIdx()))
    })

    createEffect(() => {
        setCurrentMonthIdx(monthIndex()!)
    })

    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx() - 1)
    }

    const handleNextMonth = () => {
        setCurrentMonthIdx(currentMonthIdx() + 1)
    }
    const getDayClass = (day: dayjs.Dayjs) => {
        const format = 'DD-MM-YY'
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const slcDay = daySelected && daySelected().format(format)
        if (nowDay === currDay) {
            return 'bg-red-500 rounded-full text-white'
        } else if (currDay === slcDay) {
            return 'bg-red-100 rounded-full text-red-600 font-bold'
        } else {
            return ''
        }
    }
    return (
        <div class="mt-9">
            <header class="flex justify-between">
                <p class="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx())).format('MMMM YYYY')}
                </p>
                <div>
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
                </div>
            </header>
            <div class="grid grid-cols-7 grid-rows-6">
                <For each={currentMonth[0]}>
                    {(day, i) => (
                        <span data-index={i()} class="text-sm py-1 text-center">
                            {day.format('dd').charAt(0)}
                        </span>
                    )}
                </For>

                <For each={currentMonth()}>
                    {(row, i) => (
                        <div data-index={i()}>
                            <For each={row}>
                                {(day, j) => (
                                    <button
                                        data-index={j()}
                                        onClick={() => {
                                            setSmallCalendarMonth(currentMonthIdx())
                                            setDaySelected(day)
                                        }}
                                        class={`py-1 w-full ${getDayClass(day)}`}>
                                        <span class="text-sm">{day.format('D')}</span>
                                    </button>
                                )}
                            </For>
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default SmallCalendar
