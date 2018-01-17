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

/**
 * @typedef Promotion
 */

export default mongoose.model('Promotion', PromotionSchema);
