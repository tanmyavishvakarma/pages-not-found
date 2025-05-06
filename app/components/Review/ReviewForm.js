import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, GET_BOOK } from '../../lib/queries';

const ReviewForm = ({ bookId, onSuccess }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        reviewerName: '',
        rating: '5',
        text: '',
    });

    const [createReview] = useMutation(CREATE_REVIEW, {
        refetchQueries: [{ query: GET_BOOK, variables: { id: bookId } }],
        onCompleted: () => {
            if (onSuccess) onSuccess();
            router.push('/books');
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createReview({
            variables: {
                input: {
                    bookId: parseInt(bookId),
                    ...formData,
                    rating: String(formData.rating),
                },
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewerName">
                    Your Name (optional)
                </label>
                <input
                    id="reviewerName"
                    name="reviewerName"
                    type="text"
                    value={formData.reviewerName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="mr-2 cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={parseInt(formData.rating) === rating}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <svg
                                className={`w-6 h-6 ${parseInt(formData.rating) >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                    Review
                </label>
                <textarea
                    id="text"
                    name="text"
                    rows="3"
                    value={formData.text}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;