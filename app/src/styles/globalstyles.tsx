// eslint-disable-next-line import/named
import { StylesArg, createGlobalStyles } from 'solid-styled-components'
import merge from 'ts-deepmerge'
import tw, { theme, globalStyles } from 'twin.macro'

const CustomStyles = {
    body: {
        WebkitTapHighlightColor: theme`colors.purple.500`,
        ...tw`antialiased`,
    },
}

const GlobalStyles = createGlobalStyles(merge(globalStyles, CustomStyles) as StylesArg)

export default GlobalStyles
