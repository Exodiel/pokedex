import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

const NoMatch = () => {
  const history = useHistory();
  return (
    <div
      data-testid="noMatch"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
        fontWeight: "bold"
      }}
    >
      <Typography
        style={{ fontSize: "1.5rem", fontWeight: 600, marginRight: "5px" }}
        component="h1"
      >
        404 - Not Found!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Return Home
      </Button>
    </div>
  );
};

export default NoMatch;
