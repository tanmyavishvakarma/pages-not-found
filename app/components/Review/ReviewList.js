import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../../lib/queries';
import ReviewCard from './ReviewCard';

const ReviewList = ({ bookId }) => {
    const { loading, error, data } = useQuery(GET_REVIEWS, {
        variables: { bookId: parseInt(bookId) },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error loading reviews: {error.message}</p>;

    if (!data.reviews.length) {
        return <p className="text-gray-500">No reviews yet.</p>;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
                {data.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;