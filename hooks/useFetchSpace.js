import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/spaces'; // Your JSON Server

export default function useFetchSpace(position) {
  const [space, setSpace] = useState(null);

  useEffect(() => {
    if (position !== null) {
      fetch(`${API_URL}/${position}`)
        .then(res => res.json())
        .then(data => setSpace(data))
        .catch(err => console.error('Failed to fetch space', err));
    }
     }, [position]);

  return space;
}
