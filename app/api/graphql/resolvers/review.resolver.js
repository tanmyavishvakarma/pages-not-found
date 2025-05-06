import Review from '../models/review.model.js';

export const reviewResolvers = {
  Query: {
    reviews: async (_, { bookId }) => {
      return Review.find({ bookId }).sort({ createdAt: -1 });
    }
  },
  Mutation: {
    createReview: async (_, { input }) => {
      const review = new Review({
        ...input,
        reviewerName: input.reviewerName || 'Anonymous'
      });
      return review.save();
    }
  }
};