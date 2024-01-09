import { createEffect, onCleanup } from 'solid-js'
import { Label } from '@components/ui/label'

const Welcome = () => {
    const backgroundImageClasses = []

    const body = document.querySelector('body')

    createEffect(() => {
        backgroundImageClasses.forEach((backgroundImageClass) => {
            body?.classList.add(backgroundImageClass)
            onCleanup(() => {
                body?.classList.remove(backgroundImageClass)
            })
        })
    })

    return (
        <div
            class=" flex flex-col justify-between artboard-demo w-screen h-screen z-100 overflow-hidden"
            style={{
                background: 'url(\'/images/welcome.png\') no-repeat center center fixed',
                'background-size': 'cover',
            }}>
            <div class="flex flex-col flex-1 text-center pt-10">
                <Label size="3xl" class="text-base-300">
                    A
                </Label>
                <Label size="3xl" class="text-blue-500">
                    GARDEN
                </Label>
                <Label size="3xl" class="font-bold text-purple-600">
                    ALMANAC
                </Label>
            </div>

            <div class="flex justify-center pb-10 p-10 z-10 shadow-md">
                <a href="/home" class="lotus-button p-10 z-10" />
            </div>
        </div>
    )
}

export default Welcome
