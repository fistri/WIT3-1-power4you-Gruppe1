import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';

const router = Router();

export const createTypesRouter = (prisma: PrismaClient) => {
    // GET all types
    router.get('/api/types', async (_req, res) => {
        try {
            const types = await prisma.solarmodultyp.findMany({
                orderBy: { Solarmodultypnummer: 'asc' }
            });
            res.send(types);
        } catch (error) {
            console.error('Error fetching types:', error);
            res.status(500).send({ error: 'Failed to fetch types' });
        }
    });

    // GET single type by ID
    router.get('/api/types/:id', async (req, res) => {
        try {
            const typeId = Number(req.params.id);
            if (Number.isNaN(typeId)) {
                return res.status(400).send({ error: 'Invalid type id' });
            }

            const type = await prisma.solarmodultyp.findUnique({
                where: { Solarmodultypnummer: typeId }
            });

            if (!type) {
                return res.status(404).send({ error: 'Type not found' });
            }

            res.send(type);
        } catch (error) {
            console.error('Error fetching type:', error);
            res.status(500).send({ error: 'Failed to fetch type' });
        }
    });

    // POST create new type
    router.post('/api/types', async (req, res) => {
        try {
            const { Bezeichnung, Umpp, Impp, Pmpp } = req.body;

            if (!Bezeichnung || Umpp === undefined || Impp === undefined || Pmpp === undefined) {
                return res.status(400).send({ error: 'Missing required fields: Bezeichnung, Umpp, Impp, Pmpp' });
            }

            const newType = await prisma.solarmodultyp.create({
                data: {
                    Bezeichnung,
                    Umpp: parseFloat(Umpp),
                    Impp: parseFloat(Impp),
                    Pmpp: parseFloat(Pmpp)
                }
            });

            res.status(201).send(newType);
        } catch (error) {
            console.error('Error creating type:', error);
            res.status(500).send({ error: 'Failed to create type' });
        }
    });

    // PUT update type
    router.put('/api/types/:id', async (req, res) => {
        try {
            const typeId = Number(req.params.id);
            if (Number.isNaN(typeId)) {
                return res.status(400).send({ error: 'Invalid type id' });
            }

            const { Bezeichnung, Umpp, Impp, Pmpp } = req.body;

            const updatedType = await prisma.solarmodultyp.update({
                where: { Solarmodultypnummer: typeId },
                data: {
                    ...(Bezeichnung && { Bezeichnung }),
                    ...(Umpp !== undefined && { Umpp: parseFloat(Umpp) }),
                    ...(Impp !== undefined && { Impp: parseFloat(Impp) }),
                    ...(Pmpp !== undefined && { Pmpp: parseFloat(Pmpp) })
                }
            });

            res.send(updatedType);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Type not found' });
            }
            console.error('Error updating type:', error);
            res.status(500).send({ error: 'Failed to update type' });
        }
    });

    // DELETE type
    router.delete('/api/types/:id', async (req, res) => {
        try {
            const typeId = Number(req.params.id);
            if (Number.isNaN(typeId)) {
                return res.status(400).send({ error: 'Invalid type id' });
            }

            await prisma.solarmodultyp.delete({
                where: { Solarmodultypnummer: typeId }
            });

            res.send({ message: 'Type deleted successfully' });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).send({ error: 'Type not found' });
            }
            console.error('Error deleting type:', error);
            res.status(500).send({ error: 'Failed to delete type' });
        }
    });

    return router;
};

export default router;
