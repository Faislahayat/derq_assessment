import { Router } from 'express';
import {
  getTrafficData,
  getCountryWiseTraffic,
  getVehicleTypeDistribution,
  createTrafficData,
  updateTrafficData,
  deleteTrafficData
} from '../controllers/trafficController';

const router = Router();

router.get('/traffic', getTrafficData);
router.get('/traffic/country-wise', getCountryWiseTraffic);
router.get('/traffic/vehicle-distribution', getVehicleTypeDistribution);
router.post('/traffic', createTrafficData);
router.put('/traffic/:id', updateTrafficData);
router.delete('/traffic/:id', deleteTrafficData);

export default router; 