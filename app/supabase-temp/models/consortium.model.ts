import { HardinessZone } from '@static/enums'
import { Plant } from './plant.model'

export interface GenerateConsortium {
    useHardinessZone: boolean
    plants: Plant[]
    hardinessZone?: HardinessZone
}

export interface GenerateConsortiumResult {
    consortium: Plant[]
    errors: string[]
}
