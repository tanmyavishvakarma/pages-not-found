import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true
  },
  reviewerName: { 
    type: String,
    default: 'Anonymous'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;