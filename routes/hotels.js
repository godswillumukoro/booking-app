import express from 'express'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

const router = express.Router()

// Create
router.post('/', async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// Read One
router.get('/:id', async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    }
    catch (err) {
        next(createError(401, 'You are not an authenticated user'))
        res.status(500).json(err)
    }
})

// Read All
router.get('/', async (req, res, next) => {
    try {
        const getHotels = await Hotel.find()
        res.status(200).json(getHotels)
    }
    catch (err) {
        next(err)
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Deleted')
    }
    catch (err) {
        res.status(500).json(err)
    }
})

export default router