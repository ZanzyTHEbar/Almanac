import SelectTheme from '@components/ui/theme'

const Header = () => {
    return (
        <div class="rounded-box p-2 m-2 navbar-center bg-base-200 gap-2">
            {/* TODO: Setup dropdown menu here */}
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">CADify</a>
            </div>
            {/* TODO: Move the theme to the drop-down menu */}
            <SelectTheme />
            {/* TODO: Setup Header here */}
        </div>
    )
}

export default Header
