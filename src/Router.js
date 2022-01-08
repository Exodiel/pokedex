import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Pokemon from "./Pokemon";
import Move from "./Move";
import TermsAndConditions from "./TermsAndConditions";
import Home from "./Home";
import NoMatch from "./NoMatch";
import SimpleBreadcrumbs from "./BreadRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <SimpleBreadcrumbs />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pokemon/:poke/moves/:name">
          <Move />
        </Route>
        <Route path="/pokemon/:name">
          <Pokemon />
        </Route>
        <Route path="/terms-conditions">
          <TermsAndConditions />
        </Route>
        <Route path="/404" component={NoMatch} />
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
