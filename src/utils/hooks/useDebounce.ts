import React, { useEffect, useState } from "react";



// export default function useDebounce<T>(
//     initialValue: T,
//     time=500
//   ): [T, T, React.Dispatch<T>]{
//     const [value, setValue] = useState<T>(initialValue);
//     const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
//     console.info({debouncedValue,value},'testing')
//     useEffect(() => {
//         const debounce = setTimeout(() => {
//           setDebouncedValue(value);
//         }, time);
//         return () => {
//           clearTimeout(debounce);
//         };
//       }, [value, time]);
//       return[debouncedValue, value, setValue]
//   }
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return [debouncedValue];
}
