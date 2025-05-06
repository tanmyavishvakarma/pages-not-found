const Pagination = ({ page, setPage, totalPages = 1 }) => {
    const goToPrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
                <button
                    onClick={goToPrevious}
                    disabled={page === 1}
                    className={`px-3 py-2 rounded-l-md border ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Previous
                </button>
                <span className="px-3 py-2 bg-white border-t border-b border-gray-300 text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={goToNext}
                    disabled={page === totalPages}
                    className={`px-3 py-2 rounded-r-md border ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;