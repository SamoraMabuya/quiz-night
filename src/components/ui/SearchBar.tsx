import { Search } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import Button from "./Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
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
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 pr-16 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </Button>
    </form>
  );
}
