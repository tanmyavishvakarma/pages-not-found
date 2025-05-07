import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOOK, UPDATE_BOOK, GET_BOOKS, GET_AUTHORS } from '../../api/graphql/queries';

const BookForm = ({ book = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: book?.title || '',
        genre: book?.genre || '',
        authorId: book?.authorId || '',
    });

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: onSuccess,
    });

    const [updateBook] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: onSuccess,
    });

    const { data } = useQuery(GET_AUTHORS, {
        variables: {},
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (book) {
            updateBook({ variables: { id: book.id, input: formData } });
        } else {
            createBook({ variables: { input: formData } });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
                    Genre
                </label>
                <input
                    id="genre"
                    name="genre"
                    type="text"
                    value={formData.genre}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorId">
                    Author ID
                </label>
                <select
                    id="authorId"
                    name="authorId"
                    value={formData.authorId}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select an author</option>
                    {data?.authors?.items?.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name} - ID:{author.id}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {book ? 'Update Book' : 'Add Book'}
                </button>
            </div>
        </form>
    );
};

export default BookForm;