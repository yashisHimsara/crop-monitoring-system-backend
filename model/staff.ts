export default class StaffModel {
    employeeId: string;
    firstName: string;
    lastName: string;
    designation: string;
    address: string;
    contact: string;
    gender: string;
    joinedDate: string;
    email: string;

    constructor(
        employeeId: string,
        firstName: string,
        lastName: string,
        designation: string,
        address: string,
        contact: string,
        gender: string,
        joinedDate: string,
        email: string
    ) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.designation = designation;
        this.address = address;
        this.contact = contact;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.email = email;
    }
}