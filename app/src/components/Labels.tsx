import { For } from 'solid-js'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { useCalendarContext } from '@store/context/calendar'

const Labels = () => {
    const { labels, setLabel } = useCalendarContext()
    return (
        <Card class="h-full">
            <CardHeader>
                <CardTitle class="h-full text-pretty text-gray-500 font-bold">Label</CardTitle>
            </CardHeader>
            <CardContent>
                <For each={labels()}>
                    {(label, index) => (
                        <Label data-index={index()} class="items-center mt-3 block">
                            <Input
                                type="button"
                                checked={label.checked}
                                onChange={() => setLabel(label)}
                                class={`form-checkbox h-5 w-5 text-${label.label}-400 rounded focus:ring-0 cursor-pointer`}
                            />
                            <span class="ml-2 text-pretty text-primary-content capitalize">
                                {label.label}
                            </span>
                        </Label>
                    )}
                </For>
            </CardContent>
        </Card>
    )
}

export default Labels
