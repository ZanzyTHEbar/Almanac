import type { ParentComponent } from 'solid-js'

const PageWrapper: ParentComponent = (props) => {
    return (
        <div class="ml-[50px]">
            <div class=''>{props.children}</div>
        </div>
    )
}

export default PageWrapper
