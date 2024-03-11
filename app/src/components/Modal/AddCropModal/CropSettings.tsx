import { createSignal, type Component, onMount, JSXElement } from 'solid-js'
import type { UITab } from '@static/types'
import CropModalTabs from '@components/Modal/AddCropModal/CropModalTabs'
import { useAppUIContext } from '@store/context/ui'

// TODO: Map through varieties and labels

const activeTabClasses = [
    'tab-active',
    'drop-shadow-2xl',
    'shadow-2xl',
    '[--tab-bg:var(--fallback-a,oklch(var(--p)/var(--tw-bg-opacity)))]',
    '[--tab-border-color:var(--fallback-a,oklch(var(--p)/var(--tw-bg-opacity)))]',
    'text-primary',
]

export type CropSettingsSectionProps = {
    icon: string | JSXElement
    id: string
    tab: UITab
    style?: string
    tabindex?: number
    dataIndex?: number
}

export interface CropSettingsSectionTab extends Component<CropSettingsSectionProps> {}

const CropSettingsSection: CropSettingsSectionTab = (props) => {
    const [tabRef, setTabRef] = createSignal<Element | null>(null)
    const { handleTab, defaultTab } = useAppUIContext()

    /**
     * @description Set the default tab
     */
    onMount(() => {
        handleActiveTab()
    })

    /**
     * @description Handle the click event
     * @param {PointerEvent & { currentTarget: HTMLButtonElement; target: Element }} e - The click event
     */
    const handleClick = (
        e: PointerEvent & {
            currentTarget: HTMLButtonElement
            target: Element
        },
    ) => {
        handleTab(props.tab, 'active')
        setTabRef(e.currentTarget)
        handleActiveTab()
    }

    /**
     * @description Set the selected tab element
     * @returns {void}
     */
    const handleActiveTab = () => {
        if (!tabRef()) {
            handleTab(defaultTab(), 'active')
            const defaultTabElement = document.querySelector(`#${defaultTab().id}`)
            setTabRef(defaultTabElement)
            defaultTabElement!.classList.add(...activeTabClasses)
        }

        const tabs = document.querySelectorAll('.tab')
        tabs.forEach((tab) => {
            if (tab.classList.contains('tab-active')) {
                tab.classList.remove(...activeTabClasses)
            }
        })
        tabRef()!.classList.add(...activeTabClasses)
    }

    return <CropModalTabs onClick={handleClick}></CropModalTabs>
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
