import express from 'express'
import { createHotel, deleteHotel, readAllHotels, readOneHotel, updateHotel } from '../controllers/hotelController.js'
// import { createError } from '../utils/error.js'

const router = express.Router()

// Create
router.post('/', createHotel)

// Read One
router.get('/:id', readOneHotel)

// Read All
router.get('/', readAllHotels)

// Update
router.put('/:id', updateHotel)

// Delete
router.delete('/:id', deleteHotel)

export default router