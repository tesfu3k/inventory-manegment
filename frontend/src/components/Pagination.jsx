import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({ page, setPage, limit, setLimit, meta }) => {
  const handleRowsChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const renderPageButtons = () => {
    const pages = [];
    const totalPages = meta.totalPages || 1;
    const maxButtons = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxButtons - 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((num, i) =>
      num === "..." ? (
        <span key={i} className="px-3 text-cyan-500">
          ...
        </span>
      ) : (
        <button
          key={i}
          onClick={() => setPage(num)}
          className={`px-3 py-1 rounded text-sm ${
            num === page
              ? "bg-cyan-600 text-white font-semibold"
              : "hover:bg-cyan-50 text-cyan-800"
          }`}
        >
          {num}
        </button>
      )
    );
  };

  return (
    <div className="bg-white mt-4 rounded-xl flex items-center justify-center px-4 py-3 ">
      {/* Left section — Rows per page */}
      <div className="flex items-center gap-2 mr-auto text-sm text-cyan-700">
        <span>Rows per page:</span>
        <select value={limit} onChange={handleRowsChange}>
          {[5, 10, 15, 20, 25, 50].map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </select>
        <span className="ml-4">
          {meta.total > 0
            ? `${meta.from}-${meta.to} of ${meta.total}`
            : "No records"}
        </span>
      </div>

      {/* Center section — Page numbers */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(1)}
          disabled={!meta.hasPrev}
          className="p-2 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="w-4 h-4 text-cyan-700" />
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!meta.hasPrev}
          className="p-2 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 text-cyan-700" />
        </button>

        {renderPageButtons()}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
          disabled={!meta.hasNext}
          className="p-2 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 text-cyan-700" />
        </button>
        <button
          onClick={() => setPage(meta.totalPages)}
          disabled={!meta.hasNext}
          className="p-2 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsRight className="w-4 h-4 text-cyan-700" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
