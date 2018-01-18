import azure from 'azure';
import httpStatus from 'http-status';
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
          // console.log(error);
        }
      });
      res.send(savedPromotion, httpStatus.CREATED);
    })
    .catch(e => next(e));

  return p;
}

function getDiscount(req, res) {
  const promotion = Promotion.get(req.params.promotionCode);
  promotion.then((proResult) => {
    const simpleProducts = req.body;
    let discount = 0;

    simpleProducts.forEach((product) => {
      if (arrEq(proResult._doc.tags, product.tags)) {
        discount += product.price * proResult._doc.discount;
      }
    });
    res.json({ price: discount });
  });
}

function arrEq(arr1, arr2) {
  let i;

  for (i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) { return false; }
  }
  return i === arr2.length;
}

export default { create, getDiscount };
