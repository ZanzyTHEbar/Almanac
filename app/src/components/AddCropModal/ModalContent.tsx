import CropCategory from './CropCategory'
import CropSettingsSection from './CropSettings'
import FormActions from './FormActions'
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
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleRestoreDefaults = () => {
        // Logic to restore defaults
    }

    return (
        <DialogAction>
            <form class="p-2" method="dialog">
                <CropCategory />
                <CropSettingsSection />
                <FormActions onRestoreDefaults={handleRestoreDefaults} onSubmit={handleSubmit} />
            </form>
        </DialogAction>
    )
}

export default ModalContent
