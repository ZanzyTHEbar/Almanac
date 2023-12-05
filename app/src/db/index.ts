import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()
import * as Calendar from './calendar'

export { Calendar }
