import { useState, useEffect } from "react";

import axios from "axios";

export const useMove = ({ name = "razor-wind" }) => {
  const [move, setMove] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/move/${name}`)
      .then((res) => setMove(res.data))
      .catch((err) => console.error);
  }, [name]);
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  return move ?? null;
};
