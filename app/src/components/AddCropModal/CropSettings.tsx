import { type Component, createSignal } from 'solid-js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useAppUIContext } from '@src/store/context/ui'

// TODO: Map through varieties and labels

const CropSettingsSection: Component = (props) => {
    const { openModalStatus } = useAppUIContext()
    return (
        <Tabs defaultValue="account" class="w-[400px]">
            <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="account"></TabsContent>
        </Tabs>
    )
}

export default CropSettingsSection

/* 

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple']
const { setLabels, selectedEvent, savedEvents, setSavedEvents } = useCalendarContext()

    const [selectedLabel, setSelectedLabel] = createSignal(
        selectedEvent()
            ? labelsClasses.find((lbl) => lbl === selectedEvent()!.label)
            : labelsClasses[0],
    )
    const [cropVariety, setCropVariety] = createSignal('')
    const [label, setLabel] = createSignal('')
    const [color, setColor] = createSignal('#91b026')

    const handleNewEvent = () => {
        const newEvent: CalendarEvent = {
            type: 'event',
            uuid: savedEvents().length + 1,
            label: '',
            payload: {
                start: arg.date,
                end: handleEndDate(arg.date.valueOf(), 1),
                allDay: true,
            },
        }
    }
<div class="form-section">
            <h3>Crop settings</h3>
            <div class="form-group">
                <label for="cropVariety">Crop variety (optional)</label>
                <select
                    id="cropVariety"
                    name="cropVariety"
                    value={cropVariety()}
                    onChange={(e) => setCropVariety(e.target.value)}>
                    <option value="">Select variety</option>
                </select>
            </div>

            <div class="form-group">
                <label for="label">Label (optional)</label>
                <input
                    type="text"
                    id="label"
                    name="label"
                    placeholder="E.g. Frontyard tomatoes"
                    value={label()}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>

            <div class="flex flex-row items-center justify-between">
                <label for="color">Customize color</label>

                <div class="rounded-md flex flex-row items-center justify-center">
                    <input
                        type="color"
                        id="color"
                        name="color"
                        value={color()}
                        onChange={(e) => setColor(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
        </div>

*/
