import { useEffect, useState } from 'react';

const useJsonFetcher = (...fetchArgs) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  useEffect(() => {
    let mounted = true;

    fetch(...fetchArgs)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.status, res.url);
        throw res;
      })
      .then((data) => {
        console.log(data);
        if (mounted) {
          setError('');
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setError('Load failed!');
        }
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, [fetchArgs]);

  return { loading, error, data };
};

export default useJsonFetcher;
