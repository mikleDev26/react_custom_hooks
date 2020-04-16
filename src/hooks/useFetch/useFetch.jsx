import React, { useState, useEffect } from 'react';

export default function useFetch (url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(url);
        setData(data);
        setError(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }

    };

    fetchData();

  }, [url]);

  return [loading, data, error];
}