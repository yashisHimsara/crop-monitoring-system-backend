import {PrismaClient} from '@prisma/client';
import Customer from "../model/Customer";

const prisma = new PrismaClient();

export async function CustomerAdd(c: Customer){
    try{
       const newCustomer  = await prisma.customer.create({
            data:{
                name: c.name,
                email: c.email,
            }
        })
        console.log('Customer Added :',newCustomer)
    }catch(err) {
        console.log("error adding customer", err);
    }
}

export async function CustomerDelete(id:number) {
    try{
        await prisma.customer.delete({
            where: {id: id}
        });
        console.log('Customer deleted :',id);
    }catch(err){
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers(){
    try{
        return await prisma.customer.findMany();
    }catch(err){
        console.log("error getting customers from prisma data",err);
    }
}

export async function CustomerUpdate(id: number, c: Customer){
    try{
        await prisma.customer.update({
            where:{ id : c.id},
            data:{
                name: c.name,
                email: c.email,
            }
        })
    }catch(err){
        console.log("error updating customer", err);
    }
}