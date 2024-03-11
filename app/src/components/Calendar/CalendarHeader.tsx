import { Show, Component } from 'solid-js'
import { Transition } from 'solid-transition-group'
import AppCropModal from '@components/Modal/AddCropModal'
import { BurgerMenu } from '@components/BurgerMenu'
import AddCrop from '@components/AddCropButton'
import { Button } from '@components/ui/button'
import { Card, CardHeader } from '@components/ui/card'
import { Flex } from '@components/ui/flex'
import { Icons } from '@components/ui/icon'
import { Label } from '@components/ui/label'
import { useCalendarContext } from '@store/context/calendar'
import { useAppUIContext } from '@store/context/ui'

const CalendarHeader: Component<{
    id: 'calendar' | 'widget'
}> = (props) => {
    const { showSidebar, setShowSidebar } = useAppUIContext()
    const { selectedCalendar, setCurrentMonthIndex, setShowEventModal } = useCalendarContext()

    const handleEditCalendarName = (e: PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowEventModal(true)
    }

    return (
        <>
            <Card class="card rounded-none shadow-none">
                <Flex
                    class="w-full"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="between">
                    <Transition name="burger-fade">
                        <Show when={!showSidebar()}>
                            <BurgerMenu
                                onClick={() => setShowSidebar(true)}
                                class="p-2 justify-start items-start"
                            />
                        </Show>
                    </Transition>

                    {/* Editable Calendar title */}
                    <CardHeader>
                        <Flex
                            class="w-full"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="between">
                            <Label size="2xl" weight="semiBold">
                                {selectedCalendar()?.name}
                            </Label>
                            <Icons.journal
                                onPointerDown={handleEditCalendarName}
                                size={25}
                                class="cursor-pointer text-gray-600 pb-2"
                            />
                        </Flex>
                    </CardHeader>

                    {/* Export Calendar icon */}

                    <AppCropModal id="sidebar-modal">
                        <div
                            classList={{
                                'p-4': showSidebar(),
                            }}
                            class="pr-2">
                            <AddCrop />
                        </div>
                    </AppCropModal>
                </Flex>
            </Card>
            <Card class="rounded-none shadow-none gap-4 p-2">
                <Flex
                    class="w-full p-4"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="between">
                    {/* Today button */}
                    <Button /* onClick={() => handleMonthIndex(currentMonthIdx() - 1)} */>
                        <Icons.chevronLeft size={25} class="text-gray-600 mx-2" />
                    </Button>
                    <Button /* onClick={() => handleMonthIndex(currentMonthIdx() + 1)} */>
                        <Icons.chevronRight size={25} class="text-gray-600 mx-2" />
                    </Button>
                    {/* Dropdown to select month and year, one year back and one year forward from current year - from march to march*/}
                    {/* task filter */}
                    {/* month, timeline, year calendar picker */}
                    {/* customize button */}
                </Flex>
            </Card>
        </>
    )
}

export default CalendarHeader

/* <Show when={props.id === 'calendar'}>
    <CardHeader class="flex w-full justify-start items-center">
        <img
            src="images/sprout.png"
            alt="calendar"
            class="mr-2"
        />
        <h1 class="mr-10 text-xl text-gray-500 fond-bold">Almanac</h1>
    </CardHeader>
</Show> */
