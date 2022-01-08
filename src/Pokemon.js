import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CircularProgress,
  Chip,
  Box
} from "@material-ui/core";

import { usePokemon } from "./hooks/usePokemon";

const Pokemon = withRouter(
  ({
    match: {
      params: { name }
    }
  }) => {
    const pokemon = usePokemon({ name });

    return (
      <Box data-testid="pokemonId">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CardMedia>
              {pokemon ? (
                <img
                  alt={name}
                  src={
                    pokemon?.sprites?.other.home.front_default ??
                    pokemon?.sprites?.front_default
                  }
                  style={{ maxWidth: 300 }}
                />
              ) : (
                <CircularProgress />
              )}
            </CardMedia>
          </CardActionArea>
          <CardContent>
            <Typography
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                textAlign: "center"
              }}
              gutterBottom
              variant="h5"
              component="h5"
            >
              {name}
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {pokemon
                ? pokemon.types.map((item, index) => (
                    <Chip
                      key={index}
                      style={{ fontSize: "18px" }}
                      label={item.type.name}
                      size="medium"
                    />
                  ))
                : null}
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: "15px" }} sx={{ maxWidth: 345 }}>
          <CardContent>
            {pokemon ? (
              <div>
                <Typography
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                  gutterBottom
                  variant="h5"
                  component="h5"
                >
                  Moves ({pokemon.moves.length})
                </Typography>
                <div>
                  {pokemon.moves.map((item, index) => (
                    <Link
                      key={index}
                      style={{
                        textDecoration: "none",
                        textAlign: "center"
                      }}
                      to={`/pokemon/${pokemon.name}/moves/${item.move.name}`}
                    >
                      <Chip
                        style={{
                          fontSize: "18px",
                          marginBottom: "10px",
                          marginRight: "10px",
                          cursor: "pointer"
                        }}
                        label={item.move.name}
                        size="medium"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    );
  }
);

export default Pokemon;
