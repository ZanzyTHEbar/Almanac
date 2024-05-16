import axios from 'axios'
import { addDays } from 'date-fns'
import { filterSpeciesByHardinessZone } from '../utils/validators'
import type { PlantMetadata } from '../static/types'

// TODO: Add method to handle getting local sensor data from client
// TODO: Add method to get client location data and weather data from an api

async function fetchTemporalData() {
    try {
        const res = await axios.get('http://localhost:3000/api/temporal')
        return res.data
    } catch (error) {
        console.log('[Error fetching temporal data]: ', error)
        // TODO: Implement retry logic or additional error handling here
    }
}

function isPlantInSeason(
    growthPeriod: number,
    maxAge: number,
    currentDate: Date,
    firstFrostDate: Date,
    lastFrostDate: Date,
): boolean {
    if (maxAge >= 2) {
        // Perennials are considered always in season
        return true
    }

    // For annuals and biennials, check if the current date is within the growing season
    const plantDate = addDays(currentDate, -growthPeriod)
    const harvestDate = addDays(plantDate, growthPeriod)

    return plantDate >= lastFrostDate && harvestDate <= firstFrostDate
}

function filterPlants(
    plants: PlantMetadata[],
    currentDate: Date,
    firstFrostDate: Date,
    lastFrostDate: Date,
    temperature: number,
    hardinessZone: string,
    //humidity?: number,
): PlantMetadata[] {
    const hardinessZoneCompatiblePlants = filterSpeciesByHardinessZone(hardinessZone, plants)
    console.log('[Plants available in your USDA HardinessZone]: ', hardinessZoneCompatiblePlants)

    return plants.filter((plant) => {
        // Temp
        const isTemperatureSuitable =
            temperature >= plant.climate!.idealClimate.minTemp &&
            temperature <= plant.climate!.idealClimate.maxTemp

        // Humidity
        //const isHumiditySuitable =
        //    humidity >= plant.climate.idealClimate.minHumidity &&
        //    humidity <= plant.climate.idealClimate.maxHumidity

        // Hardiness Zone
        const isZoneSuitable = hardinessZoneCompatiblePlants.includes(plant)

        // Growth Period
        const isGrowthPeriodSuitable = isPlantInSeason(
            plant.climate!.growthPeriod,
            plant.maxAge,
            currentDate,
            firstFrostDate,
            lastFrostDate,
        )

        return (
            isTemperatureSuitable /* && isHumiditySuitable */ &&
            isZoneSuitable &&
            isGrowthPeriodSuitable
        )
    })
}

export async function recommendedPlants(plants: PlantMetadata[], hardinessZone: string) {
    // Return a list of recommended plants

    try {
        const temporalData = await fetchTemporalData()
        const currentDate = new Date()
        const temperature = temporalData.temperature
        //const humidity = temporalData.humidity
        const firstFrostDate = temporalData.firstFrostDate
        const lastFrostDate = temporalData.lastFrostDate
        const recommendedPlants = filterPlants(
            plants,
            currentDate,
            firstFrostDate,
            lastFrostDate,
            temperature,
            //  humidity,
            hardinessZone,
        )

        if (recommendedPlants.length === 0) {
            throw new Error('No recommended plants found')
        }

        return recommendedPlants
    } catch (error) {
        console.warn('[Error recommending plants]: ', error)
    }
}
