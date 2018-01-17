import Promotion from '../models/promotion.model';

function create(req, res, next) {
  const promotion = new Promotion({
    isPublic: req.body.isPublic,
    promotionCode: req.body.promotionCode,
    tags: req.body.tags,
    discount: req.body.discount
  });

  promotion.save()
      .then(savedPromotion => res.json(savedPromotion))
      .catch(e => next(e));
}


function getDiscount(req, res) {
  const promotion = Promotion.get(req.params.promotionCode);
  promotion.then((proResult) => {
    res.send(`promotion tags: ${proResult.tags}`);
  });
}

export default { create, getDiscount };
