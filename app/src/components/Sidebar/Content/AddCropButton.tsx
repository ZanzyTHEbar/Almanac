import { Button } from '@components/ui/button'
import { Icons } from '@components/ui/icon'

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
                    viewBox='0 0 50 50'
                    size={30}
                    class="text-center justify-around content-center"
                />
                Add Crop
            </Button>
        </div>
    )
}

export default AddCrop
