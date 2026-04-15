import { useNavigate, useLocation } from "react-router";

export function Pagination({ pageInfo }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;

  const go = (params) =>
    navigate(`${pathname}?${new URLSearchParams(params).toString()}`);

  return (
    <div className="flex justify-center items-center gap-4 mt-10 font-proxima">
      <button
        disabled={!hasPreviousPage}
        onClick={() => go({ before: startCursor })}
        className="px-6 py-2 border border-[#D6D6D6] text-sm disabled:opacity-40
                   hover:bg-black hover:text-white transition-colors duration-200"
      >
        ← Previous
      </button>

      <button
        disabled={!hasNextPage}
        onClick={() => go({ after: endCursor })}
        className="px-6 py-2 border border-[#D6D6D6] text-sm disabled:opacity-40
                   hover:bg-black hover:text-white transition-colors duration-200"
      >
        Next →
      </button>
    </div>
  );
}
