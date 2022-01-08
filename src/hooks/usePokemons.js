import { useState, useEffect } from "react";

import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);

  let loadMore = (page) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .then((res) => {
        console.log(res.data);
        setPokemons(res.data.results);
      })
      .catch((err) => console.error);
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setPokemons(res.data.results);
        setCount(Math.floor(res.data.count / 20));
      })
      .catch((err) => console.error);
  }, []);
  return { pokemons, loadMore, count };
};
