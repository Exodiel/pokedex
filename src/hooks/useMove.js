import { useState, useEffect } from "react";

import axios from "axios";

export const useMove = ({ url }) => {
  const [move, setMove] = useState(null);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(url, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (!unmounted) {
          setMove(res.data);
        }
      })
      .catch((err) => console.error);
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url]);

  return { move };
};
