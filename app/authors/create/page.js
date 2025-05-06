'use client'

import AuthorForm from '@/app/components/Author/AuthorForm';
import { useRouter } from 'next/navigation';

const CreateAuthorPage = () => {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/authors');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Add New Author</h1>
            <AuthorForm onSuccess={handleSuccess} />
        </div>
    );
};

export default CreateAuthorPage;