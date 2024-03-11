import { Show, Component } from 'solid-js'
import { Transition } from 'solid-transition-group'
import AddCropModal from '@components/Modal/AddCropModal'
import CalendarModal from '@components/Modal/CalendarModals'
import { BurgerMenu } from '@components/ui/burger_menu'
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

    return (
        <>
            <div class="border border-gray-500 border-opacity-25">
                <Flex class="w-full" flexDirection="row" alignItems="center" justifyContent="start">
                    <Transition name="burger-fade">
                        <Show when={!showSidebar()}>
                            <BurgerMenu
                                onPointerDown={() => setShowSidebar(true)}
                                label="My Crops"
                                show={showSidebar()}
                                class="pl-2 justify-start items-start"
                            />
                        </Show>
                    </Transition>

                    {/* Editable Calendar title */}
                    <CardHeader class="justify-start items-start">
                        <Flex
                            class="w-full"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="between">
                            <Label size="2xl" weight="semiBold">
                                {selectedCalendar()?.name}
                            </Label>
                            <CalendarModal location="header" />
                        </Flex>
                    </CardHeader>
                    <div class="ml-auto">
                        <AddCropModal location="calendarHeader" />
                    </div>
                </Flex>
            </div>
            <div class="border border-gray-500 border-opacity-25">
                <Flex
                    class="w-full p-2"
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
            </div>
        </>
    )
}

export default CalendarHeader
