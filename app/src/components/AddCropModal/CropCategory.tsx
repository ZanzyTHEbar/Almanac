import { Component, createEffect, createMemo, createSignal } from 'solid-js'
import { rand } from 'solidjs-use'
import {
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemLabel,
    Combobox,
    ComboboxSection,
    ComboboxTrigger,
} from '@components/ui/combobox'

interface Crop {
    value: string
    label: string
    disabled?: boolean
}

interface CropCategory {
    label: string
    options: Crop[]
}

const generateCrops = (): CropCategory[] => {
    const crops: CropCategory[] = [
        {
            label: 'Fruits',
            options: [
                { value: 'apple', label: 'Apple' },
                { value: 'orange', label: 'Orange' },
                { value: 'banana', label: 'Banana' },
            ],
        },
        {
            label: 'Vegetables',
            options: [
                { value: 'tomato', label: 'Tomato' },
                { value: 'potato', label: 'Potato' },
                { value: 'carrot', label: 'Carrot' },
            ],
        },
        {
            label: 'Legumes',
            options: [
                { value: 'beans', label: 'Beans' },
                { value: 'peas', label: 'Peas' },
                { value: 'lentils', label: 'Lentils' },
            ],
        },
    ]

    return crops
}

const CropCategory: Component = (props) => {
    /* TODO:  Grab the options from the database, refresh the options  */
    const [values, setValues] = createSignal<Crop[]>([{ value: 'apple', label: 'Apple' }])
    const [cropCategory, setCropCategory] = createSignal('Artichoke')

    const OPTIONS_ABC = createMemo(() =>
        generateCrops().sort((a, b) => a.label.localeCompare(b.label)),
    )

    const placeHolder = createMemo(() => {
        const randomCrop = rand(0, OPTIONS_ABC().length)
        return OPTIONS_ABC()[randomCrop].label
    })

    createEffect(() => {
        OPTIONS_ABC().forEach((cropCategory) => {
            cropCategory.options.forEach((crop) => {
                console.debug('[Crop]: ', crop)
            })
        })
    })

    return (
        <div>
            <label for="cropCategory">Crop category</label>
            <Combobox<Crop, CropCategory>
                class="dropdown dropdown-end border-none"
                options={OPTIONS_ABC()}
                optionValue="value"
                optionTextValue="label"
                optionLabel="label"
                optionDisabled="disabled"
                optionGroupChildren="options"
                placeholder="Search for a crop…"
                itemComponent={(props) => (
                    <ComboboxItem item={props.item}>
                        <ComboboxItemLabel>{props.item.rawValue.label}</ComboboxItemLabel>
                        <ComboboxItemIndicator />
                    </ComboboxItem>
                )}
                sectionComponent={(props) => (
                    <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
                )}>
                <ComboboxControl aria-label="Crops">
                    <ComboboxInput />
                    <ComboboxTrigger />
                </ComboboxControl>
                <ComboboxContent />
            </Combobox>
        </div>
    )
}

export default CropCategory
