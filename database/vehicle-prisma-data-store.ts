import { PrismaClient } from '@prisma/client';
import { VehicleModel } from "../model/vehicle";

const prisma = new PrismaClient();

// Add a new vehicle
export async function addVehicle(v: VehicleModel) {
    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                vehicleCode: v.vehicleCode,
                licensePlate: v.licensePlate,
                vehicleCategory: v.vehicleCategory,
                fuelType: v.fuelType,
                status: v.status,
                allocatedStaff: v.allocatedStaff,
            },
        });
        console.log('Vehicle Added:', newVehicle);
        return newVehicle;
    } catch (err) {
        console.log('Error adding vehicle:', err);
        throw err;
    }
}

// Delete a vehicle by vehicleCode
export async function deleteVehicle(vehicleCode: string) {
    try {
        await prisma.vehicle.delete({
            where: { vehicleCode },
        });
        console.log('Vehicle deleted:', vehicleCode);
    } catch (err) {
        console.log('Error deleting vehicle:', err);
        throw err;
    }
}

// Get all vehicles
export async function getAllVehicles() {
    try {
        return await prisma.vehicle.findMany();
    } catch (err) {
        console.log('Error getting vehicles from Prisma:', err);
        throw err;
    }
}

// Update a vehicle by vehicleCode
export async function updateVehicle(vehicleCode: string, v: VehicleModel) {
    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { vehicleCode },
            data: {
                licensePlate: v.licensePlate,
                vehicleCategory: v.vehicleCategory,
                fuelType: v.fuelType,
                status: v.status,
                allocatedStaff: v.allocatedStaff,
            },
        });
        console.log('Vehicle updated:', updatedVehicle);
        return updatedVehicle;
    } catch (err) {
        console.log('Error updating vehicle:', err);
        throw err;
    }
}