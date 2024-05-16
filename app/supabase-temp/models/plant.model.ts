import { Succession, Stratum, HardinessZone } from '@static/enums'
import { Climate } from './climate.model'

export interface Plant {
    id: string
    name: string
    type: {
        stratum: Stratum
        succession: Succession
        pollinatorAttractor: boolean
        pestDetractor: boolean
        biomassAccumulator: boolean
        nitrogenFixer: boolean
        chopAndDrop: boolean
    }
    maxAge: number
    maxHeight: number
    //can be a range of hardiness zones
    hardinessZone: HardinessZone
    climate?: Climate
    pestResistance?: string[]
    companionPlants?: string[]
    needsPollinator?: boolean
    createdAt: Date
}
