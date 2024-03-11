import { Component, For } from 'solid-js'
import CalendarSelector from './CalendarSelector'
import MenuHeading from './MenuHeading'
import MenuItem from './MenuItem'
import { Flex } from '@components/ui/flex'
import { createRoutes } from '@routes/index'

const MainMenuContent: Component<{
    isHovered: boolean
    navigate: (path: string) => void
    onHover: (hover: boolean) => void
}> = (props) => {
    return (
        <Flex
            class="flex-grow gap-6"
            alignItems="baseline"
            justifyContent="start"
            flexDirection="col">
            <MenuHeading
                isHovered={props.isHovered}
                onClick={(e) => {
                    e.preventDefault()
                    props.navigate('/')
                }}
            />

            {/* Menu Items */}
            <CalendarSelector onHover={props.onHover} isHovered={props.isHovered} />

            <For each={createRoutes()}>
                {(item, index) => (
                    <MenuItem
                        label={item.label}
                        data-index={index()}
                        isHovered={props.isHovered}
                        labelSize="2xl"
                        onClick={(e) => {
                            e.preventDefault()
                            props.navigate(item.path)
                        }}
                    />
                )}
            </For>
        </Flex>
    )
}

export default MainMenuContent
