import express from 'express';
const router = express.Router();

import { getShared, share, updateShared, deleteShared } from '../controllers/share.controller.js';
import { validateShare, validateUpdateShared } from '../validators/share.validator.js'; 

router.get('/shared/:id', getShared);
router.post('/share', validateShare, share);
router.put('/share/:id', validateUpdateShared, updateShared);
router.delete('/share/:id', deleteShared);

export default router;