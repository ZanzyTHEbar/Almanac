/* eslint-disable quotes */
import { createEffect, onCleanup } from 'solid-js'

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
            class="flex flex-col justify-between artboard-demo w-screen h-screen z-100 overflow-hidden bg-no-repeat bg-center bg-cover"
            style={{
                background: "url('/images/welcome.png') no-repeat center center fixed",
                'background-size': 'cover',
            }}>
            <div class="text-center pt-10">
                <h5 class="text-base-300">A</h5>
                <h5 class="text-blue-500">GARDEN</h5>
                <h1 class="font-bold text-purple-600">ALMANAC</h1>
            </div>

            <div class="flex justify-center pb-10 p-10 z-10 shadow-md">
                <a href="/home" class="lotus-button p-10 z-10" />
            </div>
        </div>
    )
}

export default Welcome
