import express from 'express';
import { createHoliday, deleteHoliday, getHoliday, updateHoliday } from '../controllers/holidayController.js';
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js'


// Holiday route
router.route('/').get(protect, getHoliday)


router.route('/add').post(protect, createHoliday)
router.route('/delete/:id').delete( deleteHoliday)
// router.route('/update/:id').put( updateHoliday)





export default router