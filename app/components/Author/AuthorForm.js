'use client'

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_AUTHOR, UPDATE_AUTHOR, GET_AUTHORS } from '@/app/api/graphql/queries';

const AuthorForm = ({ author = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: author?.name || '',
    });

    const [createAuthor] = useMutation(CREATE_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
        onCompleted: onSuccess,
    });

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
        onCompleted: onSuccess,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (author) {
            updateAuthor({ variables: { id: author.id, input: formData } });
        } else {
            createAuthor({ variables: { input: formData } });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {author ? 'Update Author' : 'Add Author'}
                </button>
            </div>
        </form>
    );
};

export default AuthorForm;