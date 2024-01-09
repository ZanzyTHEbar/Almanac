import { Show, createSignal } from 'solid-js'
import CropSettingsSection from './CropSettings'
import type { Crop } from '@components/AddCropModal/CropCategory'
import CropCategory from '@components/AddCropModal/CropCategory'
import FormActions from '@components/AddCropModal/FormActions'
import { DialogAction } from '@components/ui/dialog'

/**
 * Content for the Add Crop Modal
 * @note Grab defaults from the chosen crop category
 * @note Crop Category
 * @note Separate Crop Settings into a tabbed component - hide crop settings until crop category is selected
 * @note transition animation to scale from the trigger on open and to the trigger on close
 * - Form Actions
 * - Crop variety (optional)
 * - label (optional)
 * - description (optional)
 * - color (present 32 colors with the option to set a custom color using a color picker)
 * - Drop down to select advanced settings (optional)
 * - Advanced settings Formatted using Steps
 * - Schedule
 *  - Seeding date (manual | relative to frost)
 *  - Season
 *  - Seeding Date (weeks (before|after) last frost)
 * - Plant
 *  - Planting Method (Transplant | Direct Sow)
 *  - Crop type (cool Season | warm season)
 *  - Alignment (square | offset)
 *  - Row Spacing (inches | cm)(check to calculate automatically)
 *  - Plant Spacing (inches | cm)
 * - Harvest
 *  - Days to maturity from seeding
 *  - Harvest window (days) (check until end of season)
 *  - Succession Planting (weeks)
 * - Winter gardening
 *  - Crop covering (no cover | one cover | two covers)
 *  - Date for winter gardening (seeding | transplanting)
 */
const ModalContent = () => {
    const [cropCategory, setCropCategory] = createSignal<Crop | null>(null)

    const handleSubmit = () => {
        //e.preventDefault()
    }

    const handleCancel = () => {
        // Logic to restore defaults
    }

    const handleCropCategoryChange = (crop: Crop) => {
        // Logic to update crop settings
        setCropCategory(crop)
    }

    return (
        <DialogAction>
            <form class="p-2" method="dialog">
                <CropCategory onChange={handleCropCategoryChange} />
                <Show when={cropCategory() !== null}>
                    <CropSettingsSection />
                </Show>
                <FormActions onCancel={handleCancel} onSubmit={handleSubmit} />
            </form>
        </DialogAction>
    )
}

export default ModalContent
