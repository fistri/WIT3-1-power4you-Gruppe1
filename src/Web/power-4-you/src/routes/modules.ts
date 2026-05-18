import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';

const router = Router();

export const createModulesRouter = (prisma: PrismaClient) => {
    // GET all modules
    router.get('/api/modules', async (_req, res) => {
        try {
            const modules = await prisma.solarmodul.findMany({
                include: {
                    Solarmodultyp: true,
                    Kunde: true
                },
                orderBy: { Modulnummer: 'asc' }
            });
            res.send(modules);
        } catch (error) {
            console.error('Error fetching modules:', error);
            res.status(500).send({ error: 'Failed to fetch modules' });
        }
    });

    // GET single module by ID
    router.get('/api/modules/:id', async (req, res) => {
        try {
            const moduleId = Number(req.params.id);
            if (Number.isNaN(moduleId)) {
                return res.status(400).send({ error: 'Invalid module id' });
            }

            const module = await prisma.solarmodul.findUnique({
                where: { Modulnummer: moduleId },
                include: {
                    Solarmodultyp: true,
                    Kunde: true,
                    Leistung: {
                        orderBy: { Timestamp: 'desc' },
                        take: 50
                    }
                }
            });

            if (!module) {
                return res.status(404).send({ error: 'Module not found' });
            }

            res.send(module);
        } catch (error) {
            console.error('Error fetching module:', error);
            res.status(500).send({ error: 'Failed to fetch module' });
        }
    });

    // POST create new module
    router.post('/api/modules', async (req, res) => {
        try {
            const { Solarmodultypnummer, Kundennummer } = req.body;

            if (!Solarmodultypnummer || !Kundennummer) {
                return res.status(400).send({ error: 'Missing required fields: Solarmodultypnummer, Kundennummer' });
            }

            const newModule = await prisma.solarmodul.create({
                data: {
                    Solarmodultypnummer: Number(Solarmodultypnummer),
                    Kundennummer: Number(Kundennummer)
                },
                include: {
                    Solarmodultyp: true,
                    Kunde: true
                }
            });

            res.status(201).send(newModule);
        } catch (error: any) {
            if (error.code === 'P2003') {
                return res.status(400).send({ error: 'Invalid Solarmodultypnummer or Kundennummer' });
            }
            console.error('Error creating module:', error);
            res.status(500).send({ error: 'Failed to create module' });
        }
    });

    // PUT update module
    router.put('/api/modules/:id', async (req, res) => {
        try {
            const moduleId = Number(req.params.id);
            if (Number.isNaN(moduleId)) {
                return res.status(400).send({ error: 'Invalid module id' });
            }

            const { Solarmodultypnummer, Kundennummer } = req.body;

            const updatedModule = await prisma.solarmodul.update({
                where: { Modulnummer: moduleId },
                data: {
                    ...(Solarmodultypnummer && { Solarmodultypnummer: Number(Solarmodultypnummer) }),
                    ...(Kundennummer && { Kundennummer: Number(Kundennummer) })
                },
                include: {
                    Solarmodultyp: true,
                    Kunde: true
                }
            });

            res.send(updatedModule);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Module not found' });
            }
            if (error.code === 'P2003') {
                return res.status(400).send({ error: 'Invalid Solarmodultypnummer or Kundennummer' });
            }
            console.error('Error updating module:', error);
            res.status(500).send({ error: 'Failed to update module' });
        }
    });

    // DELETE module
    router.delete('/api/modules/:id', async (req, res) => {
        try {
            const moduleId = Number(req.params.id);
            if (Number.isNaN(moduleId)) {
                return res.status(400).send({ error: 'Invalid module id' });
            }

            await prisma.solarmodul.delete({
                where: { Modulnummer: moduleId }
            });

            res.send({ message: 'Module deleted successfully' });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Module not found' });
            }
            console.error('Error deleting module:', error);
            res.status(500).send({ error: 'Failed to delete module' });
        }
    });

    // GET modules by customer
    router.get('/api/customers/:customerId/modules', async (req, res) => {
        try {
            const customerId = Number(req.params.customerId);
            if (Number.isNaN(customerId)) {
                return res.status(400).send({ error: 'Invalid customer id' });
            }

            const modules = await prisma.solarmodul.findMany({
                where: { Kundennummer: customerId },
                include: {
                    Solarmodultyp: true,
                    Kunde: true
                },
                orderBy: { Modulnummer: 'asc' }
            });

            res.send(modules);
        } catch (error) {
            console.error('Error fetching modules:', error);
            res.status(500).send({ error: 'Failed to fetch modules' });
        }
    });

    return router;
};

export default router;
