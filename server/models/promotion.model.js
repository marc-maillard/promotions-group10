import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const PromotionSchema = new mongoose.Schema({
  isPublic: {
    type: Boolean,
    required: true
  },
  promotionCode: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
});

PromotionSchema.method({
});

PromotionSchema.statics = {
  get(promotionCode) {
    return this.findOne({ promotionCode }, 'isPublic, tags, discount')
    .exec()
    .then((promotion) => {
      if (promotion) {
        return promotion;
      }
      const err = new APIError('josimama not found', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
  }
};


/**
 * @typedef Promotion
 */

export default mongoose.model('Promotion', PromotionSchema);
