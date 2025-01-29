import { Search } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import Button from "./Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 pr-16 rounded-lg bg-dark-100 border border-gray-700 
          text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent
          transition-all duration-200"
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 
          hover:bg-dark-300 rounded-lg transition-colors duration-200"
      >
        <Search className="w-5 h-5 text-gray-400" />
      </Button>
    </form>
  );
}
