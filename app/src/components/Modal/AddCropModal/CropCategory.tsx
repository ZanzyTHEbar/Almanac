import { TbSelector, TbSearch } from 'solid-icons/tb'
import { Component, createEffect, createMemo, createSignal, Show } from 'solid-js'
import { onClickOutside } from 'solidjs-use'
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
import { Label } from '@components/ui/label'

export interface Crop {
    value: string
    label: string
    disabled?: boolean
}

export interface CropCategoryI {
    label: string
    options: Crop[]
}

const generateCrops = (): CropCategoryI[] => {
    const crops: CropCategoryI[] = [
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

const CropCategory: Component<{
    onChange: (crop: Crop) => void
}> = (props) => {
    /* TODO:  Grab the options from the database, refresh the options  */

    const [isHover, setIsHover] = createSignal(false)
    const [inputRef, setInputRef] = createSignal<HTMLElement | null>(null)

    const categories = createMemo(() =>
        generateCrops().sort((a, b) => a.label.localeCompare(b.label)),
    )

    const handleChange = (crop: Crop) => {
        props.onChange(crop)
        console.debug('[Crop onChange]: ', crop)
    }

    const TriggerIcon = () => {
        return (
            <Show when={!isHover()} fallback={<TbSearch />}>
                <TbSelector />
            </Show>
        )
    }

    createEffect(() => {
        onClickOutside(inputRef, () => setIsHover(false))
    })

    return (
        <div class="flex flex-1 grow w-full items-center justify-between gap-6">
            <Label size="lg" for="cropCategory">
                Crop category
            </Label>
            <Combobox<Crop, CropCategoryI>
                ref={setInputRef}
                id="cropCategory"
                onChange={handleChange}
                onPointerDown={() => setIsHover(true)}
                class="w-[60%] pt-2 pb-2 z-[60]"
                options={categories()}
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
                    <ComboboxTrigger>
                        <TriggerIcon />
                    </ComboboxTrigger>
                </ComboboxControl>
                <ComboboxContent />
            </Combobox>
        </div>
    )
}

export default CropCategory
