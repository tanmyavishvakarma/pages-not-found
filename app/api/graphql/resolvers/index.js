import { authorResolvers } from './author.resolver.js';
import { bookResolvers } from './book.resolver.js';
import { reviewResolvers } from './review.resolver.js';

export const resolvers = [authorResolvers, bookResolvers, reviewResolvers];