import azure from 'azure';
import Promotion from '../models/promotion.model';

const serviceBusService = azure.createServiceBusService();

function create(req, res, next) {
  const promotion = new Promotion({
    isPublic: req.body.isPublic,
    promotionCode: req.body.promotionCode,
    tags: req.body.tags,
    discount: req.body.discount
  });

  const p = promotion.save()
     .then((savedPromotion) => {
       const message =
         {

           body:
           JSON.stringify({
             type: 'updated',
             payload: savedPromotion
           })
         };
       serviceBusService.sendTopicMessage('group10', message, (error) => {
         if (error) {
           console.log(error);
         }
       });
       res.json(savedPromotion);
     })
     .catch(e => next(e));

  return p;
}

function getDiscount(req, res) {
  const promotion = Promotion.get(req.params.promotionCode);
  promotion.then((proResult) => {
    res.send(`promotion tags: ${proResult.tags}`);
  });
}

export default { create, getDiscount };
