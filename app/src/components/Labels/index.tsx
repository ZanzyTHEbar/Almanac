import { For } from 'solid-js'
import { useCalendarContext } from '@src/store/context/calendar'

const Labels = () => {
    const { labels, setLabel } = useCalendarContext()
    return (
        <div>
            <p class="text-gray-500 font-bold mt-10">Label</p>
            <For each={labels()}>
                {(label, index) => (
                    <div>
                        <label data-index={index()} class="items-center mt-3 block">
                            <input
                                type="checkbox"
                                checked={label.checked}
                                onChange={() => setLabel(label)}
                                class={`form-checkbox h-5 w-5 text-${label.label}-400 rounded focus:ring-0 cursor-pointer`}
                            />
                            <span class="ml-2 text-gray-700 capitalize">{label.label}</span>
                        </label>
                    </div>
                )}
            </For>
        </div>
    )
}

export default Labels
