import { PrismaClient } from '@prisma/client';
import { StaffModel } from '../model/staff';

const prisma = new PrismaClient();

// Add a new staff member
export async function addStaff(s: StaffModel) {
    try {
        const newStaff = await prisma.staff.create({
            data: {
                employeeId: s.employeeId,
                firstName: s.firstName,
                lastName: s.lastName,
                designation: s.designation,
                address: s.address,
                contact: s.contact,
                gender: s.gender,
                joinedDate: s.joinedDate,
                email: s.email,
            },
        });
        console.log('Staff Added:', newStaff);
        return newStaff;
    } catch (err) {
        console.error('Error adding staff:', err);
        throw err;
    }
}

// Get all staff members
export async function getAllStaff() {
    try {
        return await prisma.staff.findMany();
    } catch (err) {
        console.error('Error fetching staff:', err);
        throw err;
    }
}

// Update a staff member by employeeId
export async function updateStaff(employeeId: string, s: StaffModel) {
    try {
        const updatedStaff = await prisma.staff.update({
            where: { employeeId: employeeId },
            data: {
                firstName: s.firstName,
                lastName: s.lastName,
                designation: s.designation,
                address: s.address,
                contact: s.contact,
                gender: s.gender,
                joinedDate: s.joinedDate,
                email: s.email,
            },
        });
        console.log('Staff Updated:', updatedStaff);
        return updatedStaff;
    } catch (err) {
        console.error('Error updating staff:', err);
        throw err;
    }
}

// Delete a staff member by employeeId
export async function deleteStaff(employeeId: string) {
    try {
        await prisma.staff.delete({
            where: { employeeId: employeeId },
        });
        console.log('Staff Deleted:', employeeId);
    } catch (err) {
        console.error('Error deleting staff:', err);
        throw err;
    }
}