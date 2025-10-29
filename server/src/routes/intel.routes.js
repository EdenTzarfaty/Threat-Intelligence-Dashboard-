import express from 'express';
import { getIpData } from '../controllers/intel.controller.js';

const router = express.Router();

// When this path is provied, it calls the 'checkIp' function from the controller.
router.get('/:ipAddress', getIpData);

export default router;

