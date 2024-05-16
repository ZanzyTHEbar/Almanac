import { Stratum, Succession } from '@static/enums'

export interface StratumSpacingRule {
    stratum1: Stratum
    stratum2: Stratum
    minimumSpacing: number
}

export interface StratumSuccession {
    stratum: Stratum | 'Unknown'
    succession: Succession | 'Unknown'
}
