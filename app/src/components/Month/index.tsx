import { For, type Component } from 'solid-js'
import Day, { dayjs } from '@components/Day'

export interface MonthProps {
    month: dayjs.Dayjs[][]
}

const Month: Component<MonthProps> = (props) => {
    return (
        <div class="p-3 gap-[3px] flex-1 grid grid-cols-7 grid-rows-6 rounded-[8px]">
            <For each={props.month}>
                {(row, i) => (
                    <For data-index={i()} each={row}>
                        {(day, j) => <Day data-index={j()} day={day} rowIdx={i()} />}
                    </For>
                )}
            </For>
        </div>
    )
}

export default Month
