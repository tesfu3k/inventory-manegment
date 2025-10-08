import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = () => {
  return (
    // Pagination Toolbar
    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            // value={pageSize}
            // onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Range text */}
        <div className="text-sm text-gray-700">
          {/* {start}–{end} of {total} */}
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            // onClick={() => setPage(1)}
            // disabled={page === 1}
            aria-label="First page"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            // onClick={() => setPage(page - 1)}
            // disabled={page === 1}
            aria-label="Previous page"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* {getPageNumbers().map((pageNum, idx) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-3 py-1">...</span>
            ) : (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                aria-current={page === pageNum ? 'page' : undefined}
                className={`px-3 py-1 rounded text-sm ${
                  page === pageNum
                    ? 'bg-blue-600 text-white font-medium'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            )
          ))} */}

          <button
            // onClick={() => setPage(page + 1)}
            // disabled={page === totalPages || totalPages === 0}
            aria-label="Next page"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            // onClick={() => setPage(totalPages)}
            // disabled={page === totalPages || totalPages === 0}
            aria-label="Last page"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
