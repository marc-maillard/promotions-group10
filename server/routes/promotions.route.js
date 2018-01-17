import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import promotionCtrl from '../controllers/promotions.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

.post(validate(paramValidation.createPromotion), promotionCtrl.create);


export default router;
