import { For } from 'solid-js'

const Calendar = () => {
    return (
        <div class="grid grid-cols-7 mt-2 rounded-md border overflow-hidden flex-1">
            {weekDays.map((weekDay, index) => (
                <div class="text-center">{weekDay.format('ddd')}</div>
            ))}
            <For each={daysToPrepend}>{(day) => <div key={`prepend_${day}`} />}</For>
            <For each={daysInMonth}>
                {(day) => {
                    const key = getDate(startOfMonth, day)
                    return (
                        <div className={`text-center `} key={key}>
                            {day + 1}
                        </div>
                    )
                }}
            </For>
        </div>
    )
}
export default Calendar
