'use client'
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK, CREATE_REVIEW, GET_REVIEWS } from '../../api/graphql/queries';
import ReviewForm from '../../components/Review/ReviewForm';
import ReviewList from '../../components/Review/ReviewList';
import { use } from 'react';

export default function BookDetail({ params }) {
  const { id } = use(params);
  const bookId = parseInt(id);

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const [addReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{
      query: GET_REVIEWS,
      variables: { bookId }
    }]
  });

  if (loading) return <div className="py-8">Loading...</div>;
  if (error) return <div className="py-8 text-red-500">Error: {error.message}</div>;
  if (!data?.book) return <div className="text-center py-8">Book not found</div>;

  const { book } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 text-xl mb-4">by {book.author?.name || 'Unknown author'}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Book Details</h2>
              <p><span className="font-medium">Genre:</span> {book.genre || 'N/A'}</p>
            </div>
          </div>

          <div>
            <ReviewForm bookId={bookId} addReview={addReview} />
          </div>
        </div>
      </div>

      <ReviewList bookId={bookId} reviews={book.reviews || []} />
    </div>
  );
}