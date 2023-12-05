import { Link } from '@solidjs/router'
import { FaSolidSeedling } from 'solid-icons/fa'
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
                    <Link
                        href="/home"
                        class="content-center text-center btn btn-secondary justify-center bottom-52 absolute border p-4 rounded-full flex items-center shadow-md hover:shadow-2xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner">
                        <FaSolidSeedling
                            color="#b1c548"
                            size={50}
                            class="text-center justify-around content-center"
                        />
                        <br />
                        <p>Enter</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome
