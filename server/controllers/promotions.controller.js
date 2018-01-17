import Promotion from '../models/promotion.model';

function create(req, res, next) {
  const promotion = new Promotion({
    isPublic: req.body.isPublic,
    promotionCode: 'dfa',
    tags: ['dfsaf'],
    discount: 1
  });

  promotion.save()
      .then(savedPromotion => res.json(savedPromotion))
      .catch(e => next(e));
}

export default { create };
