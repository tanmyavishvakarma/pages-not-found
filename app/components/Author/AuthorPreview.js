import Link from 'next/link';

const AuthorPreview = ({ author }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
                <p className="text-gray-600 mb-4">
                    Books: {author.books?.length || 0}
                </p>
                <Link
                    href={`/authors/${author.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default AuthorPreview;