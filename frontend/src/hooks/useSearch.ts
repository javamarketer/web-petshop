import { useState, useCallback } from 'react';

interface UseSearchOptions {
  debounceMs?: number;
}

interface UseSearchResult<T> {
  query: string;
  results: T[];
  loading: boolean;
  setQuery: (query: string) => void;
  search: (items: T[], searchFn: (item: T, query: string) => boolean) => void;
}

export function useSearch<T>(options?: UseSearchOptions): UseSearchResult<T> {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    (items: T[], searchFn: (item: T, query: string) => boolean) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      // Simulate async search
      setTimeout(() => {
        const filtered = items.filter((item) => searchFn(item, query.toLowerCase()));
        setResults(filtered);
        setLoading(false);
      }, options?.debounceMs || 300);
    },
    [query, options?.debounceMs]
  );

  return { query, results, loading, setQuery, search };
}
