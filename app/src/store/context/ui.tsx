import {
    type Accessor,
    type ParentComponent,
    createContext,
    createMemo,
    useContext,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { UiStore } from '@static/types'

interface AppUIContext {
    openModalStatus: Accessor<
        | {
              openModal: boolean
              editingMode: boolean
          }
        | undefined
    >
    showSidebar: Accessor<boolean>
    showNotifications: Accessor<boolean | undefined>
    setOpenModal: (status: { openModal: boolean; editingMode: boolean }) => void
    setShowSidebar: (showSidebar: boolean) => void
}

const AppUIContext = createContext<AppUIContext>()
export const AppUIProvider: ParentComponent = (props) => {
    const defaultState: UiStore = {
        showSidebar: true,
        modalStatus: {
            openModal: false,
            editingMode: false,
        },
        loggedIn: false,
        showNotifications: true,
    }

    const [state, setState] = createStore<UiStore>(defaultState)

    const setOpenModal = (status: { openModal: boolean; editingMode: boolean }) => {
        setState(
            produce((s) => {
                s.modalStatus = status
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

    const openModalStatus = createMemo(() => uiState().modalStatus)
    const showNotifications = createMemo(() => uiState().showNotifications)
    const showSidebar = createMemo(() => uiState().showSidebar)

    return (
        <AppUIContext.Provider
            value={{
                openModalStatus,
                showSidebar,
                showNotifications,
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
