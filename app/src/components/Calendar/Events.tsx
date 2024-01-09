import { type Component } from 'solid-js'
import type { CalendarEvent } from '@static/types'
import { Card, CardContent } from '@components/ui/card'
import { useCalendarContext } from '@store/context/calendar'

// TODO: Implement draggable on events
// TODO: Events must be the color chosen for that event
// TODO: Events must have the name of the crop, the number planted, and a custom label
// TODO: Events must have a leaf icon on the left-most side of the event itself
// TODO: Double clicking on the event opens up a modal to edit the event itself
// TODO: Drag and Drop updates the start and end date of the crop

const CalendarEvents: Component<{
    evt: CalendarEvent
}> = (props) => {
    const { setSelectedEvent } = useCalendarContext()
    return (
        <Card
            onClick={() => setSelectedEvent(props.evt)}
            class={`bg-${props.evt.label}-200 p-1 mr-3 text-base-content text-pretty text-sm rounded mb-1 truncate`}>
            <CardContent>{props.evt.payload.title}</CardContent>
        </Card>
    )
}

export default CalendarEvents
