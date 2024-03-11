import { Button } from '@components/ui/button'
import { Icons } from '@components/ui/icon'
import { Label } from '@components/ui/label'

const AddCrop = () => {
    return (
        <div class="pt-2">
            <Button
                class="text-pretty text-secondary-content"
                variant="primary"
                size="default"
                styles="default">
                <Icons.plus
                    color="primary"
                    viewBox="0 0 50 50"
                    size={30}
                    class="text-center justify-around content-center"
                />
                <Label styles="pointer" size="lg">
                    Add Crop
                </Label>
            </Button>
        </div>
    )
}

export default AddCrop
