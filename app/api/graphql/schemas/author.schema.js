import { gql } from "@apollo/client";

export const authorTypeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book]
    createdAt: String!
    updatedAt: String!
  }

  input AuthorInput {
    name: String!
  }

  input AuthorFilter {
    name: String
  }

  type PaginatedAuthors {
    items: [Author]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  extend type Query {
    authors(page: Int, limit: Int, filter: AuthorFilter): PaginatedAuthors
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(input: AuthorInput!): Author
    updateAuthor(id: ID!, input: AuthorInput!): Author
    deleteAuthor(id: ID!): Boolean
  }
`;