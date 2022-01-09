import {
  Box,
  Card,
  Typography,
  CardContent,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardActionArea,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { useMove } from "./hooks/useMove";
import { usePokemon } from "./hooks/usePokemon";

const Move = withRouter(
  ({
    match: {
      params: { name, poke },
    },
  }) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
    const { move } = useMove({ url: `https://pokeapi.co/api/v2/move/${name}` });
    const { pokemon } = usePokemon({ url });
    return (
      <Box data-testid="moveId">
        <Card>
          <CardActionArea
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                  style={{ maxWidth: 200 }}
                />
              ) : (
                <CircularProgress />
              )}
            </CardMedia>
          </CardActionArea>
          <CardContent>
            <Typography
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                textAlign: "center",
              }}
              gutterBottom
              variant="h5"
              component="h5"
            >
              {name}
            </Typography>
          </CardContent>
          <CardContent>
            <Container>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 600,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h5"
                      >
                        Effect
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {move ? (
                        move.effect_entries.map((entry, index) => (
                          <Typography key={index}>{entry.effect}</Typography>
                        ))
                      ) : (
                        <CircularProgress />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 600,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h5"
                      >
                        Short Effect
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {move
                        ? move.effect_entries.map((entry, index) => (
                            <Typography key={index}>
                              {entry.short_effect}
                            </Typography>
                          ))
                        : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 600,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h5"
                      >
                        Power
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {move ? (
                        <Typography>{move.power}</Typography>
                      ) : (
                        <CircularProgress />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 600,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h5"
                      >
                        Accuracy
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {move ? (
                        <Typography>{move.accuracy}</Typography>
                      ) : (
                        <CircularProgress />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Container>
          </CardContent>
        </Card>
      </Box>
    );
  }
);

export default Move;
