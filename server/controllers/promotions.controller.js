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

export default { create };
