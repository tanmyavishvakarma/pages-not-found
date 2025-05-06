import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
query GetBooks($page: Int, $limit: Int, $filter: BookFilter) {
  books(page: $page, limit: $limit, filter: $filter) {
    items {
      id
      title
      genre
      author {
        id
        name
      }
      averageRating
    }
    totalItems
    totalPages
    currentPage
  }
}
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      genre
      author {
        id
        name
      }
      reviews {
        id
        reviewerName
        rating
        text
        createdAt
      }
      averageRating
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      genre
      author {
        id
        name
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: BookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      genre
      author {
        id
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors($page: Int, $limit: Int, $filter: AuthorFilter) {
    authors(page: $page, limit: $limit, filter: $filter) {
      items {
        id
        name
        books {
          id
          title
        }
      }
      totalPages
      totalItems
      currentPage
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      books {
        id
        title
        genre
        averageRating
      }
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($input: AuthorInput!) {
    createAuthor(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $input: AuthorInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($bookId: Int!) {
    reviews(bookId: $bookId) {
      id
      reviewerName
      rating
      text
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      id
      reviewerName
      rating
      text
    }
  }
`;