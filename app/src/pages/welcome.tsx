import { createSignal, Show } from 'solid-js'

const Welcome = () => {
    const [name, setName] = createSignal('')

    return (
        <div class="w-full h-full relative">
            <div class="z-[-1] scale-[1.2] w-full h-full bg-[url('/images/bg-1.png')] bg-cover object-cover inset-0 bg-center bg-repeat mb-8 p-3 flex flex-col justify-center items-center" />
            <div class="flex flex-col items-center">
                <div class="flex flex-col flex-1 grow justify-start items-center space-y-2 top-11 absolute z-10 w-full h-full">
                    <div class="flex flex-row items-center gap-2">
                        <h5 class="text-[#072268e3]">A</h5>
                        <h5 class="text-[#5b9cf0] ">GARDEN</h5>
                    </div>
                    <h1 class="font-bold text-[#072268]">ALMANAC</h1>
                    <button class="justify-end">
                        TEST
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome
