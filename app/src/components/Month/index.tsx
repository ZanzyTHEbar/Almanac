import { For, type Component } from 'solid-js'
import Day, { dayjs } from '@components/Day'

export interface MonthProps {
    month: dayjs.Dayjs[][]
}

const Month: Component<MonthProps> = (props) => {
    return (
        <div
            class="flex-1 grid grid-cols-7 grid-rows-6"
            style={{
                'border-top-left-radius': '8px',
                'border-top-right-radius': '8px',
                gap: '3px',
                padding: '3px',
            }}>
            <For each={props.month}>
                {(row, i) => (
                    <For data-index={i()} each={row}>
                        {(day, j) => (
                            <div>
                                <Day data-index={j()} day={day} rowIdx={i()} />
                            </div>
                        )}
                    </For>
                )}
            </For>
        </div>
    )
}

export default Month
