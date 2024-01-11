import type { Component } from 'solid-js'
import PageWrapper from '@src/pages/PageWrapper'

const SettingsPage: Component = () => {
    return (
        <PageWrapper>
            <div class="flex flex-col items-center justify-center h-screen">
                <h1 class="text-5xl font-bold">Tasks</h1>
            </div>
        </PageWrapper>
    )
}

export default SettingsPage
