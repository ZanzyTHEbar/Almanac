/* @refresh reload */
import { Router } from '@solidjs/router'
import { TiVendorMicrosoft } from 'solid-icons/ti'
import { onMount } from 'solid-js'
import { render } from 'solid-js/web'
import { useAppContextMain, AppContextMainProvider } from '@src/store/context/main'
import '@styles/login-imports.css'

const Login = () => {
    const { handleTitlebar } = useAppContextMain()

    onMount(() => {
        handleTitlebar()
    })

    return (
        <section class="pb-20 flex flex-col items-center justify-center w-full h-screen text-center bg-gray-200 rounded-sm">
            <div class="container px-6 py-24">
                <div class="g-6 flex flex-wrap items-center justify-center lg:justify-between">
                    <div class="mb-6 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img src="./login.svg" class="w-full" alt="Phone image" />
                    </div>
                    <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <a
                            class="mb-3 flex w-full items-center justify-center rounded bg-green-600 px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            style={{ 'background-color': 'rgb(21 128 61 / var(--tw-bg-opacity))' }}
                            href="#!"
                            role="button"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <TiVendorMicrosoft class="pr-2" fill="white" size={45} />
                            Continue with Microsoft
                        </a>
                    </div>
                    {/* <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                            OR
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
/* <div class="overflow-y-auto flex flex-col items-center justify-center w-full flex-1 text-center px-20 bg-gray-200 rounded-bl-sm rounded-br-sm">
            <div class="mt-20 bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl">
                
            </div>
        </div> */
render(
    () => (
        <Router>
            <AppContextMainProvider>
                <Login />
            </AppContextMainProvider>
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
)
