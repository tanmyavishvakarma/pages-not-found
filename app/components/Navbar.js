
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Pages Not Found
                </Link>
                <div className="flex space-x-4">
                    <Link href="/books" className="hover:underline">
                        Books
                    </Link>
                    <Link href="/authors" className="hover:underline">
                        Authors
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;