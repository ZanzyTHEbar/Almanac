import {
    type Accessor,
    type ParentComponent,
    createContext,
    createMemo,
    useContext,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { UITab, UIStore } from '@static/types'

type TabEvent = 'add' | 'hide' | 'show' | 'active'

interface AppUIContext {
    openModalStatus: Accessor<
        | {
              openModal: boolean
              editingMode: boolean
          }
        | undefined
    >
    tabs: Accessor<UITab[]>
    defaultTab: Accessor<UITab>
    selectedTab: Accessor<UITab | null>
    showSidebar: Accessor<boolean>
    showNotifications: Accessor<boolean | undefined>
    handleTab: (new_tab: UITab | UITab[], event: TabEvent) => void
    setOpenModal: (status: { openModal: boolean; editingMode: boolean }) => void
    setShowSidebar: (showSidebar: boolean) => void
}

const AppUIContext = createContext<AppUIContext>()
export const AppUIProvider: ParentComponent = (props) => {
    const defaultState: UIStore = {
        showSidebar: true,
        selectedTab: null,
        tabs: [],
        modalStatus: {
            openModal: false,
            editingMode: false,
        },
        loggedIn: false,
        showNotifications: true,
    }

    const [state, setState] = createStore<UIStore>(defaultState)

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

    const handleTab = (new_tab: UITab | UITab[], event: TabEvent) => {
        setState(
            produce((draft) => {
                switch (event) {
                    case 'active':
                        // handle tabs being an array
                        if (Array.isArray(new_tab)) break
                        draft.selectedTab = new_tab
                        break
                    case 'add':
                        if (Array.isArray(new_tab)) {
                            draft.tabs = new_tab
                            break
                        }
                        draft.tabs.push(new_tab)
                        break
                    case 'hide':
                        if (Array.isArray(new_tab)) {
                            draft.tabs.forEach((tab) => {
                                new_tab.forEach((t) => {
                                    if (tab.id === t.id) {
                                        tab.visible = false
                                    }
                                })
                            })

                            break
                        }
                        draft.tabs.forEach((tab) => {
                            if (tab.id === new_tab.id) {
                                tab.visible = false
                            }
                        })
                        break
                    case 'show':
                        if (Array.isArray(new_tab)) {
                            draft.tabs.forEach((tab) => {
                                new_tab.forEach((t) => {
                                    if (tab.id === t.id) {
                                        tab.visible = true
                                    }
                                })
                            })
                            break
                        }
                        draft.tabs.forEach((tab) => {
                            if (tab.id === new_tab.id) {
                                tab.visible = true
                            }
                        })
                        break
                    default:
                        break
                }
            }),
        )
    }

    const uiState = createMemo(() => state)

    const openModalStatus = createMemo(() => uiState().modalStatus)
    const tabs = createMemo(() => uiState().tabs)
    const showNotifications = createMemo(() => uiState().showNotifications)
    const showSidebar = createMemo(() => uiState().showSidebar)
    const selectedTab = createMemo(() => uiState().selectedTab)
    const defaultTab = createMemo(() => tabs().find((tab) => tab.id === 'part_history')!)

    return (
        <AppUIContext.Provider
            value={{
                openModalStatus,
                tabs,
                defaultTab,
                selectedTab,
                showSidebar,
                showNotifications,
                handleTab,
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
