import type { ParentComponent } from 'solid-js'

const PageWrapper: ParentComponent = (props) => {
    return (
        <div class="ml-[90px] select-none">
            <div class="">{props.children}</div>
        </div>
    )
}

export default PageWrapper
