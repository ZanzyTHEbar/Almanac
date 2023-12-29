/* eslint-disable quotes */
import { createEffect, onCleanup } from 'solid-js'

const Welcome = () => {

    const backgroundImageClasses = [
        "bg-[url('/images/welcome.png')]",
        'bg-cover',
        'bg-center',
        'bg-no-repeat',
        'bg-fixed',
        'object-cover',
        'mixed-blend-multiply',
    ]

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
        <div class="overflow-hidden w-full h-full relative">
            <div class="w-full h-full mb-8 p-3 flex flex-col justify-center items-center" />
            <div class="flex flex-col items-center">
                <div class="flex flex-col flex-1 grow justify-start items-center space-y-2 top-11 absolute z-10 w-full h-full">
                    <div class="flex flex-row items-center gap-2">
                        <h5 class="text-[#072268e3]">A</h5>
                        <h5 class="text-[#5b9cf0] ">GARDEN</h5>
                    </div>
                    <h1 class="font-bold text-[#072268]">ALMANAC</h1>
                    <a class="justify-center absolute bottom-52 flex" href="/home">
                        <div class="lotus-button" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Welcome
