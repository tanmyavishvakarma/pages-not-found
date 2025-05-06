'use client'

import { useRouter } from 'next/navigation';
import BookForm from '../../components/Book/BookForm';

const CreateBookPage = () => {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/books');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
            <BookForm onSuccess={handleSuccess} />
        </div>
    );
};

export default CreateBookPage;