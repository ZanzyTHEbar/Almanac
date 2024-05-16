import { stratumCategories, successionCategories } from '../static/globals'
import { filterSpeciesByHardinessZone } from '../utils/validators'
import type { PlantMetadata, StratumSuccession } from '../static/types'

function generateConsortium(
    speciesList: PlantMetadata[],
    useHardinessZone: boolean = false,
    hardinessZone?: string,
): { label: string; consortium: PlantMetadata[] }[] {
    const consortiums: { label: string; consortium: PlantMetadata[] }[] = []

    const filteredSpeciesList = useHardinessZone
        ? filterSpeciesByHardinessZone(hardinessZone!, speciesList)
        : speciesList

    if (filteredSpeciesList.length === 0) {
        console.log('No plants match your query')
        return []
    }

    const groupedSpecies = groupSpecies(filteredSpeciesList)
    for (const group of groupedSpecies) {
        const consortium = createConsortium(group)
        if (consortium.length >= 3 && hasRequiredProperties(consortium)) {
            const label = getConsortiumLabel(group)
            consortiums.push({ label, consortium })
        }
    }

    return consortiums
}

function getConsortiumLabel(speciesGroup: PlantMetadata[]): string {
    const stratumSuccession = getStratumSuccession(speciesGroup)
    return `${stratumSuccession.stratum} - ${stratumSuccession.succession} Consortium`
}

function groupSpecies(speciesList: PlantMetadata[]): PlantMetadata[][] {
    const groups: PlantMetadata[][] = []
    for (const stratum of stratumCategories) {
        for (const succession of successionCategories) {
            const group = speciesList.filter(
                (species) =>
                    species.maxHeight <= getMaxHeightForStratum(stratum) &&
                    belongsToSuccession(species, succession),
            )
            groups.push(group)
        }
    }

    return groups
}

function getStratumSuccession(speciesGroup: PlantMetadata[]): StratumSuccession {
    for (const stratum of stratumCategories) {
        for (const succession of successionCategories) {
            if (speciesGroup.every((species) => belongsToSuccession(species, succession))) {
                return { stratum, succession }
            }
        }
    }

    return { stratum: 'Unknown', succession: 'Unknown' }
}

function getMaxHeightForStratum(stratum: string): number {
    switch (stratum) {
        case 'Emergent':
            return 30
        case 'High':
            return 20
        case 'Medium':
            return 10
        case 'Low':
            return 5
        default:
            return 0
    }
}

function belongsToSuccession(species: PlantMetadata, succession: string): boolean {
    if (succession === 'Climax / Secondary III') {
        return species.maxAge >= 80
    } else if (succession === 'Secondary II') {
        return species.maxAge >= 30 && species.maxAge < 80
    } else if (succession === 'Secondary I') {
        return species.maxAge >= 2 && species.maxAge < 30
    } else if (succession === 'Placental II') {
        return species.maxAge >= 0.5 && species.maxAge < 2
    } else if (succession === 'Placental I') {
        return species.maxAge < 0.5
    }

    return false
}

function createConsortium(group: PlantMetadata[]): PlantMetadata[] {
    const consortium: PlantMetadata[] = []

    for (const species of group) {
        if (consortium.length === 0 || hasRequiredProperties([species])) {
            consortium.push(species)
        }
    }

    return consortium
}

function hasRequiredProperties(consortium: PlantMetadata[]): boolean {
    for (const species of consortium) {
        if (
            species.pollinatorAttractor ||
            species.pestDetractor ||
            species.biomassAccumulator ||
            species.nitrogenFixer ||
            species.chopAndDrop
        ) {
            return true
        }
    }

    return false
}

// TODO: Implement spacing algorithm for cross-stratum rules based on succession rules
/* function calculateSpacing(stratum1: string, stratum2: string): number {
    const rule = stratumSpacingRules.find(
        (spacingRule) =>
            (spacingRule.stratum1 === stratum1 &&
                spacingRule.stratum2 === stratum2) ||
            (spacingRule.stratum1 === stratum2 && spacingRule.stratum2 === stratum1)
    );

    if (rule) {
        return rule.minimumSpacing;
    }

    return 0;
} */

export { generateConsortium }
