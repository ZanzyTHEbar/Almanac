import { Accessor, createContext, createMemo, useContext, type ParentComponent } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { MenuOpen, UiStore } from '@src/static/types'

interface AppUIContext {
    openModalStatus: Accessor<boolean | undefined>
    menuOpenStatus: Accessor<MenuOpen | null | undefined>
    showSidebar: Accessor<boolean>
    showNotifications: Accessor<boolean | undefined>
    setMenu: (menuOpen: MenuOpen | null) => void
    setOpenModal: (openModal: boolean) => void
    setShowSidebar: (showSidebar: boolean) => void
}

const AppUIContext = createContext<AppUIContext>()
export const AppUIProvider: ParentComponent = (props) => {
    const defaultState: UiStore = {
        showSidebar: true,
        openModal: false,
        menuOpen: null,
        loggedIn: false,
        showNotifications: true,
    }

    const [state, setState] = createStore<UiStore>(defaultState)

    const setMenu = (menuOpen: MenuOpen | null) => {
        setState(
            produce((s) => {
                s.menuOpen = menuOpen || null
            }),
        )
    }

    const setOpenModal = (openModal: boolean) => {
        setState(
            produce((s) => {
                s.openModal = openModal
            }),
        )
    }

    const setShowSidebar = (showSidebar: boolean) => {
        setState(
            produce((s) => {
                s.showSidebar = showSidebar
            }),
        )
    }

    const uiState = createMemo(() => state)

    const openModalStatus = createMemo(() => uiState().openModal)
    const menuOpenStatus = createMemo(() => uiState().menuOpen)
    const showNotifications = createMemo(() => uiState().showNotifications)
    const showSidebar = createMemo(() => uiState().showSidebar)

    return (
        <AppUIContext.Provider
            value={{
                openModalStatus,
                menuOpenStatus,
                showSidebar,
                showNotifications,
                setMenu,
                setOpenModal,
                setShowSidebar,
            }}>
            {props.children}
        </AppUIContext.Provider>
    )
}

export const useAppUIContext = () => {
    const context = useContext(AppUIContext)
    if (context === undefined) {
        throw new Error('useAppUIContext must be used within an AppUIProvider')
    }
    return context
}
