import express from 'express';
import { addStaff, deleteStaff, getAllStaff, updateStaff } from "../database/staff-prisma-data-store";
import StaffModel from "../model/staff";

const router = express.Router();

// Route to add a new staff member
router.post('/add', async (req, res) => {
    const {
        employeeId,
        firstName,
        lastName,
        designation,
        address,
        contact,
        gender,
        joinedDate,
        email
    } = req.body;

    const newStaff = new StaffModel(
        employeeId,
        firstName,
        lastName,
        designation,
        address,
        contact,
        gender,
        joinedDate,
        email
    );

    try {
        console.log(newStaff);
        const staff = await addStaff(newStaff);
        res.status(201).json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error adding staff member' });
    }
});

// Route to get all staff members
router.get('/get', async (req, res) => {
    try {
        const staffList = await getAllStaff();
        res.status(200).json(staffList);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching staff members' });
    }
});

// Route to update a staff member
router.put('/update', async (req, res) => {
    const {
        employeeId,
        firstName,
        lastName,
        designation,
        address,
        contact,
        gender,
        joinedDate,
        email
    } = req.body;

    const updatedStaff = new StaffModel(
        employeeId,
        firstName,
        lastName,
        designation,
        address,
        contact,
        gender,
        joinedDate,
        email
    );

    try {
        const staff = await updateStaff(employeeId, updatedStaff);
        res.status(200).json({ message: `Staff member ${employeeId} updated successfully`, staff });
    } catch (err) {
        res.status(500).json({ error: 'Error updating staff member' });
    }
});

// Route to delete a staff member by employeeId
router.delete('/delete/:employeeId', async (req, res) => {
    const { employeeId } = req.params;

    try {
        await deleteStaff(employeeId);
        res.status(200).json({ message: `Staff member ${employeeId} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting staff member' });
    }
});

export const staffRoute = router;