import express, { Router } from 'express';
import CropModel from "../model/crop";
import { addCrop, deleteCrop, getAllCrops, updateCrop } from "../database/crop-prisma-data-store";

const router = express.Router();

// Add a new crop
router.post('/add', async (req, res) => {
    const {
        cropCode,
        commonName,
        scientificName,
        category,
        season,
        field,
        image
    } = req.body;

    const newCrop = new CropModel(
        cropCode,
        commonName,
        scientificName,
        image,
        category,
        season,
        field
    );

    try {
        const crop = await addCrop(newCrop);
        res.status(201).json(crop);
    } catch (err) {
        res.status(500).json({ error: 'Error adding crop' });
    }
});

// Get all crops
router.get('/get', async (req, res) => {
    try {
        const crops = await getAllCrops();
        res.status(200).json(crops);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching crops' });
    }
});

// Delete a crop by cropCode
router.delete('/delete/:cropCode', async (req, res) => {
    const { cropCode } = req.params;

    try {
        await deleteCrop(cropCode);
        res.status(200).json({ message: `Crop ${cropCode} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting crop' });
    }
});

// Update a crop
router.put('/update', async (req, res) => {
    const { cropCode } = req.body;
    const {
        commonName,
        scientificName,
        category,
        season,
        field,
        image
    } = req.body;

    const updatedCrop = new CropModel(
        cropCode,
        commonName,
        scientificName,
        image,
        category,
        season,
        field
    );

    try {
        await updateCrop(cropCode, updatedCrop);
        res.status(200).json({ message: `Crop ${cropCode} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating crop' });
    }
});

export const cropRoute = router;