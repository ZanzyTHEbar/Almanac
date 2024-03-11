import { type ParentComponent, Show } from 'solid-js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useAppUIContext } from '@src/store/context/ui'

// TODO: Map through varieties and labels

const CropModalTabs: ParentComponent<{
    onClick: (
        e: PointerEvent & {
            currentTarget: HTMLButtonElement
            target: Element
        },
    ) => void
}> = (props) => {
    const { openModalStatus } = useAppUIContext()

    const handleTabActive = (
        e: PointerEvent & {
            currentTarget: HTMLButtonElement
            target: Element
        },
    ) => {
        console.debug('Tab Active')
        props.onClick(e)
    }

    return (
        <Tabs defaultValue="account" class="w-[400px]">
            <TabsList class="grid w-full grid-cols-2">
                <Show when={openModalStatus()?.editingMode}>
                    {/* TODO: Setup Help Window here */}
                    <div class="" />
                </Show>
                <TabsTrigger onPointerDown={handleTabActive} value="account">
                    Crop Settings
                </TabsTrigger>
            </TabsList>
            <TabsContent value="crop_settings">{props.children}</TabsContent>
        </Tabs>
    )
}

export default CropModalTabs
