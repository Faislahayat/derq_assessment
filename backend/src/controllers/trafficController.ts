import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTrafficData = async (req: Request, res: Response) => {
  try {
    const trafficData = await prisma.trafficData.findMany({
      select: {
        id: true,
        country: true,
        city: true,
        location: true,
        timestamp: true,
        vehicleType: true,
        count: true,
        speed: true,
        direction: true
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
};

export const getCountryWiseTraffic = async (req: Request, res: Response) => {
  try {
    const countryData = await prisma.trafficData.groupBy({
      by: ['country'],
      _sum: {
        count: true
      },
      orderBy: {
        _sum: {
          count: 'desc'
        }
      }
    });

    const formattedData = countryData.map(item => ({
      country: item.country,
      totalCount: item._sum.count || 0
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country-wise traffic data' });
  }
};

export const getVehicleTypeDistribution = async (req: Request, res: Response) => {
  try {
    const vehicleData = await prisma.trafficData.groupBy({
      by: ['vehicleType'],
      _sum: {
        count: true
      },
      orderBy: {
        _sum: {
          count: 'desc'
        }
      }
    });

    const formattedData = vehicleData.map(item => ({
      vehicleType: item.vehicleType,
      totalCount: item._sum.count || 0
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle type distribution data' });
  }
};

export const createTrafficData = async (req: Request, res: Response) => {
  try {
    const { country, city, location, vehicleType, count, speed, direction } = req.body;
    const trafficData = await prisma.trafficData.create({
      data: {
        country,
        city,
        location,
        vehicleType,
        count,
        speed,
        direction
      }
    });
    res.status(201).json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create traffic data' });
  }
};

export const updateTrafficData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { country, city, location, vehicleType, count, speed, direction } = req.body;
    const trafficData = await prisma.trafficData.update({
      where: { id: Number(id) },
      data: {
        country,
        city,
        location,
        vehicleType,
        count,
        speed,
        direction
      }
    });
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update traffic data' });
  }
};

export const deleteTrafficData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.trafficData.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete traffic data' });
  }
};

export const getTrafficDataWithCountry = async (req: Request, res: Response) => {
  try {
    const trafficData = await prisma.trafficData.findMany({
      select: {
        id: true,
        country: true,
        city: true,
        location: true,
        timestamp: true,
        vehicleType: true,
        count: true,
        speed: true,
        direction: true
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
}; 