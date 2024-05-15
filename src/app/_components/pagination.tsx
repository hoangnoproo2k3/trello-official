import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <ul className="pagination flex space-x-2">
            {pages.map(page => (
                <li key={page}>
                    <button
                        onClick={() => onPageChange(page)}
                        className={`py-2 px-4 rounded-md focus:outline-none ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-gray-200'}`}
                    >
                        {page}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
