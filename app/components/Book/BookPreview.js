import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '@/app/api/graphql/queries';

const BookPreview = ({ book }) => {
    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                page: 1, limit: 9, filter: {
                    title: '',
                    genre: '',
                    authorId: '',
                }
            },
            fetchPolicy: 'network-only', nextFetchPolicy: 'network-only'
        }],
    });

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook({ variables: { id: book.id } });
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('Failed to delete book. Please try again.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-1">Genre: {book.genre || 'N/A'}</p>
                <p className="text-gray-600 mb-1">Author: {book.author?.name || 'Unknown'}</p>
                <p className="text-gray-600 mb-4">
                    Rating: {book.averageRating ? book.averageRating.toFixed(1) : 'No ratings yet'}
                </p>
                <div className="flex justify-between items-center">
                    <Link
                        href={`/books/${book.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800 font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookPreview;