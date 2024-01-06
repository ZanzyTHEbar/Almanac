import { Card, CardContent } from '@components/ui/card'
import SelectTheme from '@components/ui/theme'

const Header = () => {
    return (
        <Card class="rounded-box p-2 m-2 navbar-center gap-2">
            <CardContent>
                {/* TODO: Setup dropdown menu here */}
                <div class="flex-1">
                    <a class="btn btn-ghost normal-case text-xl">CADify</a>
                </div>
                {/* TODO: Move the theme to the drop-down menu */}
                <SelectTheme />
                {/* TODO: Setup Header here */}
            </CardContent>
        </Card>
    )
}

export default Header
