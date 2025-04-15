import { useEffect, useState } from 'react';

/**
 * A custom hook that debounces a value.
 * @param {T} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {T} - The debounced value
 */
const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
