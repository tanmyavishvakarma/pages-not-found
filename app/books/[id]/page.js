import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK, CREATE_REVIEW } from '../../lib/queries';
import { useRouter } from 'next/router';
import ReviewForm from '../../components/Review/ReviewForm';
import ReviewList from '../../components/Review/ReviewList';

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const [addReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_BOOK, variables: { id } }]
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.book.title}</h1>
        <p className="text-gray-600 text-xl mb-4">by {data.book.author.name}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Book Details</h2>
              <p><span className="font-medium">Genre:</span> {data.book.genre}</p>
            </div>
          </div>
          
          <div>
            <ReviewForm bookId={id} addReview={addReview} />
          </div>
        </div>
      </div>
      
      <ReviewList bookId={id} reviews={data.book.reviews} />
    </div>
  );
}