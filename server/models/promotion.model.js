import mongoose from 'mongoose';

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
  get(promotionCodeReq) {
    return this.findOne({ promotionCode: promotionCodeReq })
    .exec((err, promotion) => {
      if (promotion) {
        return promotion;
      }

      return Promise.reject(err);
    });
  }
};


/**
 * @typedef Promotion
 */

export default mongoose.model('Promotion', PromotionSchema);
