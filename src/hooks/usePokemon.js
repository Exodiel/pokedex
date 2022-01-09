import { useState, useEffect } from "react";

import axios from "axios";

export const usePokemon = ({ url }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    const fetchData = () => {
      axios
        .get(url, {
          cancelToken: source.token,
        })
        .then((res) => {
          if (!unmounted) {
            setPokemon(res.data);
          }
        })
        .catch((err) => console.error);
    };
    fetchData();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url]);

  return { pokemon };
};
