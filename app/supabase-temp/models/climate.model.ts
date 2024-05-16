export interface Climate {
    temperature: number
    humidity: number
    growthPeriodDays: number // in days
    idealClimate: {
        minTemp: number
        maxTemp: number
        minHumidity: number
        maxHumidity: number
        soilMoisturePreference: 'dry' | 'moist' | 'varied'
        sunlightRequirement: 'full-sun' | 'partial-shade' | 'full-shade'
    }
}
