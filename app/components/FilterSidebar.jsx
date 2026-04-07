import { useState } from "react";

function FilterGroup({ filter, selected, onToggle }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[#D6D6D6] py-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-proxima text-sm tracking-widest uppercase text-black">
          {filter.label}
        </span>
        <span
          className="text-black text-lg leading-none transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {filter.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <label
                key={option}
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={() => onToggle(filter.id, option)}
              >
                <div
                  className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#6B1B2A] border-[#6B1B2A]"
                      : "border-[#B0B0B0] bg-white group-hover:border-[#6B1B2A]"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.8 7L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`font-proxima text-sm transition-colors duration-150 ${
                    isSelected
                      ? "text-[#6B1B2A]"
                      : "text-gray-600 group-hover:text-black"
                  }`}
                >
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilterSidebar({ filters, onFilterChange }) {
  const [selected, setSelected] = useState({});

  const handleToggle = (filterId, option) => {
    setSelected((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      const next = { ...prev, [filterId]: updated };
      onFilterChange?.(next);
      return next;
    });
  };

  const totalSelected = Object.values(selected).flat().length;

  const handleClearAll = () => {
    setSelected({});
    onFilterChange?.({});
  };

  if (!filters || filters.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-proxima text-xs tracking-widest uppercase text-gray-400">
          Filters {totalSelected > 0 && `(${totalSelected})`}
        </span>
        {totalSelected > 0 && (
          <button
            onClick={handleClearAll}
            className="font-proxima text-xs text-[#6B1B2A] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Clear All
          </button>
        )}
      </div>

      {filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          filter={filter}
          selected={selected[filter.id] || []}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
