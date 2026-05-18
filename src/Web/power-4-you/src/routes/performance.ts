import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';

const router = Router();

export const createPerformanceRouter = (prisma: PrismaClient) => {
    // GET all performance data
    router.get('/api/performance', async (req, res) => {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 100;
            const performance = await prisma.leistung.findMany({
                include: {
                    Solarmodul: {
                        include: {
                            Kunde: true,
                            Solarmodultyp: true
                        }
                    }
                },
                orderBy: { Timestamp: 'desc' },
                take: limit
            });
            res.send(performance);
        } catch (error) {
            console.error('Error fetching performance data:', error);
            res.status(500).send({ error: 'Failed to fetch performance data' });
        }
    });

    // GET performance by module (existing endpoint, improved)
    router.get('/api/modules/:moduleId/performance', async (req, res) => {
        try {
            const moduleId = Number(req.params.moduleId);
            if (Number.isNaN(moduleId)) {
                return res.status(400).send({ error: 'Invalid module id' });
            }

            const limit = req.query.limit ? Number(req.query.limit) : 100;
            const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
            const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

            const performance = await prisma.leistung.findMany({
                where: {
                    Modulnummer: moduleId,
                    ...(startDate && endDate && {
                        Timestamp: {
                            gte: startDate,
                            lte: endDate
                        }
                    })
                },
                include: {
                    Solarmodul: {
                        include: {
                            Kunde: true,
                            Solarmodultyp: true
                        }
                    }
                },
                orderBy: { Timestamp: 'desc' },
                take: limit
            });

            res.send(performance);
        } catch (error) {
            console.error('Error fetching module performance:', error);
            res.status(500).send({ error: 'Failed to fetch module performance' });
        }
    });

    // GET performance by customer
    router.get('/api/customers/:customerId/performance', async (req, res) => {
        try {
            const customerId = Number(req.params.customerId);
            if (Number.isNaN(customerId)) {
                return res.status(400).send({ error: 'Invalid customer id' });
            }

            const limit = req.query.limit ? Number(req.query.limit) : 100;

            const performance = await prisma.leistung.findMany({
                where: {
                    Solarmodul: {
                        Kundennummer: customerId
                    }
                },
                include: {
                    Solarmodul: {
                        include: {
                            Kunde: true,
                            Solarmodultyp: true
                        }
                    }
                },
                orderBy: { Timestamp: 'desc' },
                take: limit
            });

            res.send(performance);
        } catch (error) {
            console.error('Error fetching customer performance:', error);
            res.status(500).send({ error: 'Failed to fetch customer performance' });
        }
    });

    // POST create new performance entry
    router.post('/api/performance', async (req, res) => {
        try {
            const { Modulnummer, Power_Out, Timestamp } = req.body;

            if (!Modulnummer || Power_Out === undefined) {
                return res.status(400).send({ error: 'Missing required fields: Modulnummer, Power_Out' });
            }

            const newPerformance = await prisma.leistung.create({
                data: {
                    Modulnummer: Number(Modulnummer),
                    Power_Out: Number(Power_Out),
                    ...(Timestamp && { Timestamp: new Date(Timestamp) })
                },
                include: {
                    Solarmodul: {
                        include: {
                            Kunde: true,
                            Solarmodultyp: true
                        }
                    }
                }
            });

            res.status(201).send(newPerformance);
        } catch (error: any) {
            if (error.code === 'P2003') {
                return res.status(400).send({ error: 'Invalid Modulnummer' });
            }
            console.error('Error creating performance entry:', error);
            res.status(500).send({ error: 'Failed to create performance entry' });
        }
    });

    // GET average performance stats by module
    router.get('/api/modules/:moduleId/stats', async (req, res) => {
        try {
            const moduleId = Number(req.params.moduleId);
            if (Number.isNaN(moduleId)) {
                return res.status(400).send({ error: 'Invalid module id' });
            }

            const performances = await prisma.leistung.findMany({
                where: { Modulnummer: moduleId },
                select: { Power_Out: true }
            });

            if (performances.length === 0) {
                return res.send({ count: 0, average: 0, max: 0, min: 0 });
            }

            const powerOutputs = performances.map(p => p.Power_Out);
            const average = powerOutputs.reduce((a, b) => a + b, 0) / powerOutputs.length;
            const max = Math.max(...powerOutputs);
            const min = Math.min(...powerOutputs);

            res.send({
                count: performances.length,
                average: Math.round(average * 100) / 100,
                max,
                min
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).send({ error: 'Failed to fetch stats' });
        }
    });

    return router;
};

export default router;
