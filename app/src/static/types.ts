import dayjs from 'dayjs'
import type { ENotificationType, ENotificationAction } from '@static/enums'
import type { WebviewWindow } from '@tauri-apps/api/window'
import type { JSXElement } from 'solid-js'
import type { ToasterStore } from 'terracotta'

//********************************* Settings *************************************/

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

export type CropsContextMenu = 'delete' | 'hide'
export type CropContextMenu = 'duplicate' | 'edit' | 'succession' | CropsContextMenu
export type CalendarDate = Date | string | number | dayjs.Dayjs
export type CalendarEventTType = 'event' | 'task' | 'reminder'
export type CalendarEventModify = 'push' | 'update' | 'delete'
export type CalendarEventTasks =
    | 'Seeding'
    | 'Direct Seed'
    | 'Transplanting'
    | 'Cultivating'
    | 'Harvesting'
    | 'Bed Preparation'

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
    task: CalendarEventTasks
    label: string
    uuid: string | number
    payload: CalendarEventContent
}

export interface CalendarEventContent extends DateUtilityObject {
    title: string
    description: string
    start: CalendarDate
    end: CalendarDate
    color?: string
}

export interface Calendar extends DateUtilityObject {
    //smallCalendarWidget: DateUtilityObject
    showEventModal: boolean
    savedEvents: CalendarEvent[]
    selectedEvent: CalendarEvent | null
    labels: CalendarLabel[]
    filteredEvents: CalendarEvent[]
    name: string
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
    showNotifications?: boolean
}

//********************************* Config *************************************/

/**
 * @description Debug mode levels
 * @export typedef {string} DebugMode
 * @property {'off'} off
 * @property {'error'} error
 * @property {'warn'} warn
 * @property {'info'} info
 * @property {'debug'} debug
 * @property {'trace'} trace
 */
export type DebugMode = 'off' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * @description This is the export type that is passed to the Tauri Store instance to handle persistent data within the app.
 * @export typedef {Object} PersistentSettings
 * @property {boolean} enableNotificationsSounds
 * @property {boolean} enableNotifications
 * @property {ENotificationAction} globalNotificationsType
 * @property {boolean} enableMDNS
 * @property {boolean} scanForCamerasOnStartup
 * @property {CameraSettings} cameraSettings
 * @property {AlgorithmSettings} algorithmSettings
 * @property {FilterParams} filterParams
 * @property {OSCSettings} oscSettings
 */
export type PersistentSettings = {
    user?: string
    enableNotificationsSounds?: boolean
    enableNotifications?: boolean
    globalNotificationsType?: ENotificationAction
    enableMDNS?: boolean
    debugMode?: DebugMode
}

/**
 * @description Backend Config
 */
export type BackendConfig = {
    version?: number | string
    debug?: DebugMode
}
