import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';

const router = Router();

export const createCustomersRouter = (prisma: PrismaClient) => {
    // GET all customers
    router.get('/api/customers', async (_req, res) => {
        try {
            const customers = await prisma.kunde.findMany({
                include: {
                    User: true,
                    Solarmodul: true
                },
                orderBy: { Kundennummer: 'asc' }
            });
            res.send(customers);
        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).send({ error: 'Failed to fetch customers' });
        }
    });

    // GET single customer by ID
    router.get('/api/customers/:id', async (req, res) => {
        try {
            const customerId = Number(req.params.id);
            if (Number.isNaN(customerId)) {
                return res.status(400).send({ error: 'Invalid customer id' });
            }

            const customer = await prisma.kunde.findUnique({
                where: { Kundennummer: customerId },
                include: {
                    User: true,
                    Solarmodul: {
                        include: {
                            Solarmodultyp: true
                        }
                    }
                }
            });

            if (!customer) {
                return res.status(404).send({ error: 'Customer not found' });
            }

            res.send(customer);
        } catch (error) {
            console.error('Error fetching customer:', error);
            res.status(500).send({ error: 'Failed to fetch customer' });
        }
    });

    // POST create new customer
    router.post('/api/customers', async (req, res) => {
        try {
            const { User_ID, Vorname, Nachname, Strasse, Hausnummer, Postleitzahl, Ort, Email, Telefonnummer } = req.body;

            if (!User_ID || !Vorname || !Nachname) {
                return res.status(400).send({ error: 'Missing required fields: User_ID, Vorname, Nachname' });
            }

            const newCustomer = await prisma.kunde.create({
                data: {
                    User_ID: Number(User_ID),
                    Vorname,
                    Nachname,
                    Strasse: Strasse || '',
                    Hausnummer: Hausnummer || '',
                    Postleitzahl: Postleitzahl || '',
                    Ort: Ort || '',
                    Email: Email || '',
                    Telefonnummer: Telefonnummer || ''
                },
                include: {
                    User: true,
                    Solarmodul: true
                }
            });

            res.status(201).send(newCustomer);
        } catch (error: any) {
            if (error.code === 'P2003') {
                return res.status(400).send({ error: 'Invalid User_ID' });
            }
            if (error.code === 'P2002') {
                return res.status(400).send({ error: 'User_ID already exists for another customer' });
            }
            console.error('Error creating customer:', error);
            res.status(500).send({ error: 'Failed to create customer' });
        }
    });

    // PUT update customer
    router.put('/api/customers/:id', async (req, res) => {
        try {
            const customerId = Number(req.params.id);
            if (Number.isNaN(customerId)) {
                return res.status(400).send({ error: 'Invalid customer id' });
            }

            const { Vorname, Nachname, Strasse, Hausnummer, Postleitzahl, Ort, Email, Telefonnummer } = req.body;

            const updatedCustomer = await prisma.kunde.update({
                where: { Kundennummer: customerId },
                data: {
                    ...(Vorname && { Vorname }),
                    ...(Nachname && { Nachname }),
                    ...(Strasse && { Strasse }),
                    ...(Hausnummer && { Hausnummer }),
                    ...(Postleitzahl && { Postleitzahl }),
                    ...(Ort && { Ort }),
                    ...(Email && { Email }),
                    ...(Telefonnummer && { Telefonnummer })
                },
                include: {
                    User: true,
                    Solarmodul: true
                }
            });

            res.send(updatedCustomer);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Customer not found' });
            }
            console.error('Error updating customer:', error);
            res.status(500).send({ error: 'Failed to update customer' });
        }
    });

    // DELETE customer
    router.delete('/api/customers/:id', async (req, res) => {
        try {
            const customerId = Number(req.params.id);
            if (Number.isNaN(customerId)) {
                return res.status(400).send({ error: 'Invalid customer id' });
            }

            await prisma.kunde.delete({
                where: { Kundennummer: customerId }
            });

            res.send({ message: 'Customer deleted successfully' });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Customer not found' });
            }
            console.error('Error deleting customer:', error);
            res.status(500).send({ error: 'Failed to delete customer' });
        }
    });

    return router;
};

export default router;
