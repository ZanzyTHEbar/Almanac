import { Combobox } from '@kobalte/core'
import { FaSolidCaretDown, FaSolidCheck } from 'solid-icons/fa'
import { ImCross } from 'solid-icons/im'
import { Component, For, createMemo, createSignal } from 'solid-js'
import { rand } from 'solidjs-use'

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

    return (
        <>
            <div class="form-group">
                <label for="cropCategory">Crop category</label>
                <Combobox.Root<Crop, CropCategory>
                    options={OPTIONS_ABC()}
                    name="cropCategory"
                    multiple
                    value={values()}
                    onChange={setValues}
                    defaultFilter="startsWith"
                    placeholder={placeHolder()}
                    itemComponent={(props) => (
                        <Combobox.Item item={props.item} class="combobox__item">
                            <Combobox.ItemLabel>{props.item.rawValue.label}</Combobox.ItemLabel>
                            <Combobox.ItemIndicator class="combobox__item-indicator">
                                <FaSolidCheck />
                            </Combobox.ItemIndicator>
                        </Combobox.Item>
                    )}
                    sectionComponent={(props) => (
                        <Combobox.Section>{props.section.rawValue.label}</Combobox.Section>
                    )}>
                    <Combobox.Control class="combobox__control" aria-label="Fruit">
                        {(state) => (
                            <>
                                <div>
                                    <For each={state.selectedOptions()}>
                                        {(option) => (
                                            <span onPointerDown={(e) => e.stopPropagation()}>
                                                {option}
                                                <button onClick={() => state.remove(option)}>
                                                    <ImCross />
                                                </button>
                                            </span>
                                        )}
                                    </For>
                                    <Combobox.Input />
                                </div>
                                <button
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={state.clear}>
                                    <ImCross />
                                </button>
                                <Combobox.Trigger>
                                    <Combobox.Icon>
                                        <FaSolidCaretDown />
                                    </Combobox.Icon>
                                </Combobox.Trigger>
                            </>
                        )}
                    </Combobox.Control>
                    <Combobox.Portal>
                        <Combobox.Content class="combobox__content">
                            <Combobox.Listbox class="combobox__listbox" />
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
            </div>
        </>
    )
}

export default CropCategory
