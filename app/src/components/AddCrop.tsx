import PlusIcon from '@components/PlusIcon'

const AddCrop = () => {
    return (
        <button class="btn btn-primary">
            <span class="flex flex-row items-center">
                <PlusIcon
                    color="#ffffffe3"
                    size={30}
                    class="text-center justify-around content-center"
                />
                <p class="mt-3 pl-2 text-[#ffffffe3]">Add Crop</p>
            </span>
        </button>
    )
}

export default AddCrop
