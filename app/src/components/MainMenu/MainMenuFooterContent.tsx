import { Component } from 'solid-js'
import MenuItem from './MenuItem'
import MenuSeparator from './MenuSeparator'
import { Flex } from '@components/ui/flex'

const FooterContent: Component<{
    isHovered: boolean
    navigate: (path: string) => void
}> = (props) => {
    return (
        <>
            <MenuSeparator isHovered={props.isHovered} />
            <Flex
                class="gap-2 pb-4"
                alignItems="baseline"
                justifyContent="center"
                flexDirection="col">
                <MenuItem
                    label="Help Docs"
                    isHovered={props.isHovered}
                    labelSize="2xl"
                    onClick={(e) => {
                        e.preventDefault()
                        // TODO: Open the help docs
                    }}
                />
                <MenuItem
                    label="Profile"
                    isHovered={props.isHovered}
                    labelSize="2xl"
                    onClick={(e) => {
                        e.preventDefault()
                        props.navigate('/profile')
                    }}
                />
            </Flex>
        </>
    )
}

export default FooterContent
