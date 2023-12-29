import { ENotificationAction, ENotificationType } from '../enums'
import type { CalendarEventTType, DebugMode } from '@static/types'
import type { WebviewWindow } from '@tauri-apps/api/window'
import type { JSXElement } from 'solid-js'
import type { ToasterStore } from 'terracotta'

//* Utility Interfaces

export interface GeneralError {
    readonly _tag: 'ETVRError'
    readonly error: string | number | unknown
}

//* Component Interfaces
export interface Internal {
    errorMsg?: string
    error?: boolean
}

export interface Inputs {
    input: (props?: Internal) => JSXElement
}

export interface SkeletonHandlerProps {
    render?: boolean
    items?: SkeletonProps[]
    children?: JSXElement
}

export interface SkeletonProps {
    class: string
}

export interface CardProps {
    children?: JSXElement
    src?: string
    title?: string
    subTitle?: string
    imageAlt?: string
    buttonElement?: JSXElement
    background?: string
    backgroundColor?: string
}

export interface NotificationAction {
    callbackOS(): void
    callbackApp(): void
}

export interface Notifications {
    title: string
    message: string
    type: ENotificationType
}

export interface IWindow {
    label: string
    window: WebviewWindow
}

//**********************************************************************************************************************************************************************/
//*                                                                                                                                                                    */
//*                                                                  Calendar Interfaces                                                                               */
//*                                                                                                                                                                    */
//**********************************************************************************************************************************************************************/

export type CalendarDate = Date | string | number
export type CalendarEventTType = 'event' | 'task' | 'reminder' | null
export type CalendarEventModify = 'push' | 'update' | 'delete' | null

export interface DateUtilityObject {
    date?: CalendarDate
    daySelected?: CalendarDate
}

export interface CalendarLabel {
    label: string
    checked: boolean
}

export interface CalendarEvent {
    type: CalendarEventTType
    label: string
    uuid: string | number
    payload: CalendarEventContent
}

export interface CalendarEventContent extends DateUtilityObject {
    title: string
    description: string
    start: CalendarDate
    end: CalendarDate
    allDay?: boolean
    color?: string
}

export interface Calendar extends DateUtilityObject {
    smallCalendarWidget: DateUtilityObject
    showEventModal: boolean
    savedEvents: CalendarEvent[]
    selectedEvent: CalendarEvent | null
    labels: CalendarLabel[]
    filteredEvents: CalendarEvent[]
}

export interface MenuOpen {
    x: number
    y: number
}

export interface NewMenu {
    children: JSXElement
    ref: HTMLElement | null
    name: string
}

export interface ModalMenu {
    children: JSXElement
    title?: string
    initialFocus?: string
}

//*  App Store Interfaces  */

export interface AppStore {
    debugMode: DebugMode
}

export interface AppStoreNotifications {
    notifications?: ToasterStore<Notifications>
    enableNotificationsSounds: boolean
    enableNotifications: boolean
    globalNotificationsType: ENotificationAction
}

export interface UiStore {
    showSidebar: boolean
    loggedIn: boolean
    openModal?: boolean
    menuOpen?: MenuOpen | null
    showNotifications?: boolean
}
