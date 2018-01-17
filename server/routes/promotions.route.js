import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import promotionCtrl from '../controllers/promotions.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(validate(paramValidation.createPromotion), promotionCtrl.create);


router.route('/:promotionCode')
    .post((req, res) => {
      res.send('OKAY');
    });

// validate(paramValidation.getDiscount), promotionCtrl.getDiscount
export default router;
