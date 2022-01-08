import { useState, useEffect } from "react";

import axios from "axios";

export const usePokemon = ({ name = "pikachu" }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error);
  }, [name]);
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  return pokemon ?? null;
};
