'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '@/app/api/graphql/queries';
import Pagination from '../Pagination';
import BookPreview from './BookPreview';

const BookList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [filter, setFilter] = useState({
        title: '',
        genre: '',
        authorId: '',
    });

    const { loading, error, data } = useQuery(GET_BOOKS, {
        variables: { page, limit, filter },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
        setPage(1);
    };

    return (
        <div>
            <div className="mb-6 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Filter Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={filter.title}
                            onChange={handleFilterChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={filter.genre}
                            onChange={handleFilterChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author ID</label>
                        <input
                            type="number"
                            name="authorId"
                            value={filter.authorId}
                            onChange={handleFilterChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Books</h1>
                <Link href="/books/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add New Book
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p>Loading books...</p>
                </div>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.books.items.map((book) => (
                            <BookPreview key={book.id} book={book} />
                        ))}
                    </div>

                    <Pagination 
                        page={page} 
                        setPage={setPage} 
                        totalPages={data.books.totalPages}
                    />
                </>
            )}
        </div>
    );
};

export default BookList;