import axios from 'axios'
import { PlantMetadata } from '../static/types'

interface PlantAPIResponse {
    plantID: string | number
}

// TODO: Generate a plant API service that will fetch plant data from a plant API and create PlantMetadata objects

// TODO: Implement means to search for plants by name, hardiness zone, and other metadata fields then generate PlantMetadata objects, store them in a cache, and return them

export class PlantAPIService {
    private apiCache: PlantAPIResponse[]
    public plantsCache: PlantMetadata[]

    constructor() {
        this.apiCache = []
        this.plantsCache = []
    }

    async generatePlantMetadata(plantID: string) {
        // check if plantID already exists in plantsCache

        const plantIDs = this.plantsCache.map((plant) => plant.plantID)
        if (plantIDs.includes(plantID)) return

        // if not, get plantData from plant API
        const plantData = await this.getPlantData(plantID)

        // TODO: get plant attributes from plantData

        // create PlantMetadata object and add it to plantsCache
        //const newPlant: PlantMetadata = {
        //    plantID: plantID,
        //}
        //
        //this.plantsCache.push(newPlant)
    }

    async getPlantData(plantID: string) {
        //Handle duplicates
        if (this.apiCache[plantID]) return this.apiCache[plantID]

        try {
            // TODO: Implement accessing a plant API to get plant data
            const res = await axios.get(`http://localhost:3000/api/plants/${plantID}`)
            this.apiCache[plantID] = res.data
            return res.data
        } catch (error) {
            console.log('[Error fetching plant data]: ', error)
        }
    }
}
