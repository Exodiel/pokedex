import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CircularProgress,
  Container
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { usePokemons } from "./hooks/usePokemons";

const Home = () => {
  let { pokemons, loadMore, count } = usePokemons();

  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage === 1) {
      newPage = 0;
    }
    loadMore(newPage);
  };

  return (
    <Container>
      <Typography
        style={{
          fontSize: "18px",
          fontWeight: 900,
          marginBottom: "15px",
          textAlign: "center"
        }}
        component="h1"
      >
        POKEDEX
      </Typography>
      <Grid container spacing={4}>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Link
                style={{
                  textDecoration: "none",
                  textAlign: "center"
                }}
                to={`/pokemon/${pokemon.name}`}
              >
                <Card style={{ padding: "20px" }}>
                  <Typography
                    style={{ fontSize: "1.5rem", fontWeight: 600 }}
                    component="h1"
                  >
                    {pokemon.name}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px"
        }}
      >
        <Pagination
          size="large"
          count={count}
          page={page}
          onChange={handleChangePage}
        />
      </Container>
    </Container>
  );
};

export default Home;
