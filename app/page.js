import Link from 'next/link';

export default function Home() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Pages Not Found</h1>
            <p className="text-xl mb-8">Explore our collection of books and authors</p>
            <div className="flex justify-center space-x-4">
                <Link href="/books" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Browse Books
                </Link>
                <Link href="/authors" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                    Browse Authors
                </Link>
            </div>
        </div>
    );
}