import { gql } from "@apollo/client";

export const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String
    author: Author
    authorId: Int
    reviews: [Review]
    averageRating: Float
    createdAt: String!
    updatedAt: String!
  }

  input BookInput {
    title: String!
    genre: String
    authorId: String!
  }

  input BookFilter {
    title: String
    genre: String
    authorId: String
  }

  type PaginatedBooks {
    items: [Book]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  extend type Query {
    books(page: Int, limit: Int, filter: BookFilter): PaginatedBooks
    book(id: ID!): Book
  }

  extend type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): Boolean
  }
`;