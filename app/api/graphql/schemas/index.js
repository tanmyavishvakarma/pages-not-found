import { gql } from '@apollo/client';
import { authorTypeDefs } from './author.schema.js';
import { bookTypeDefs } from './book.schema.js';
import { reviewTypeDefs } from './review.schema.js';

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, authorTypeDefs, bookTypeDefs, reviewTypeDefs];