import { gql } from "@apollo/client";

export const reviewTypeDefs = gql`
  type Review {
    id: ID!
    bookId: Int!
    reviewerName: String!
    rating: Int!
    text: String
    createdAt: String!
  }

  input ReviewInput {
    bookId: Int!
    reviewerName: String
    rating: String!
    text: String
  }

  extend type Query {
    reviews(bookId: Int!): [Review]
  }

  extend type Mutation {
    createReview(input: ReviewInput!): Review
  }
`;