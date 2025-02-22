import express from "express";
import Crop from "../model/Crop";
import { CropAdd, CropDelete, CropUpdate, getAllCrops } from "../database/prisma-data-store";

const router = express.Router();

router.post("/add", async (req, res) => {
    const crop: Crop = req.body;
    try {
        const addedCrop = await CropAdd(crop);
        res.send("Crop Added");
    } catch (err) {
        console.log("Error adding crop", err);
        res.status(400).send("Error adding crop");
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id: number = +req.params.id;
    try {
        await CropDelete(id);
        res.send("Crop Deleted");
    } catch (err) {
        console.log("Error deleting crop", err);
        res.status(400).send("Error deleting crop");
    }
});

router.put("/update/:id", async (req, res) => {
    const id: number = +req.params.id;
    const crop: Crop = req.body;
    try {
        await CropUpdate(id, crop);
        res.send("Crop Updated");
    } catch (err) {
        console.log("Error updating crop", err);
        res.status(400).send("Error updating crop");
    }
});

router.get("/view", async (req, res) => {
    try {
        const crops = await getAllCrops();
        res.json(crops);
    } catch (err) {
        console.log("Error getting crops", err);
        res.status(400).send("Error getting crops");
    }
});

export default router;
