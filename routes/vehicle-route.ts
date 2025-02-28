import express, { Router } from 'express';
import {
    addVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
} from "../database/vehicle-prisma-data-store";
import VehicleModel from "../model/vehicle";

const router = Router();

// Add a new vehicle
router.post('/add', async (req, res) => {
    const {
        vehicleCode,
        licensePlate,
        vehicleCategory,
        fuelType,
        status,
        allocatedStaff
    } = req.body;

    const newVehicle = new VehicleModel(
        vehicleCode,
        licensePlate,
        vehicleCategory,
        fuelType,
        status,
        allocatedStaff
    );

    try {
        const vehicle = await addVehicle(newVehicle);
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: 'Error adding vehicle' });
    }
});

// Get all vehicles
router.get('/get', async (req, res) => {
    try {
        const vehicles = await getAllVehicles();
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching vehicles' });
    }
});

// Update a vehicle
router.put('/update', async (req, res) => {
    const {
        vehicleCode,
        licensePlate,
        vehicleCategory,
        fuelType,
        status,
        allocatedStaff
    } = req.body;

    const updatedVehicle = new VehicleModel(
        vehicleCode,
        licensePlate,
        vehicleCategory,
        fuelType,
        status,
        allocatedStaff
    );

    try {
        await updateVehicle(vehicleCode, updatedVehicle);
        res.status(200).json({ message: `Vehicle ${vehicleCode} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating vehicle' });
    }
});

// Delete a vehicle by vehicleCode
router.delete('/delete/:vehicleCode', async (req, res) => {
    const { vehicleCode } = req.params;

    try {
        await deleteVehicle(vehicleCode);
        res.status(200).json({ message: `Vehicle ${vehicleCode} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting vehicle' });
    }
});

export const vehicleRoute = router;