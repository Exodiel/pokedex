import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Link, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NoMatch from "../NoMatch";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("Testing App component", () => {
  it("should navigate to /terms-conditions route", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <Router history={history}>
        <div data-testid="terms">
          <Link to="/">Home</Link>
          <Link to="/terms-conditions">Terms & Conditions</Link>
        </div>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    const wrapperNode = getByTestId("terms");
    const ancleNode = wrapperNode.childNodes[1];
    fireEvent.click(ancleNode);
    expect(history.location.pathname).toBe("/terms-conditions");
  });

  it("should navigate to /pokemon/:name route", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const pokemonMock = "pikachu";
    const { getByTestId } = render(
      <Router history={history}>
        <div data-testid="terms">
          <Link to="/">Home</Link>
          <Link to={`/pokemon/${pokemonMock}`}>Pokemon</Link>
        </div>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    const wrapperNode = getByTestId("terms");
    const ancleNode = wrapperNode.childNodes[1];
    fireEvent.click(ancleNode);
    expect(history.location.pathname).toBe(`/pokemon/${pokemonMock}`);
  });

  it("should navigate to /pokemon/:name/moves/:move route", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const pokemonMock = "bulbasaur";
    const moveMock = "razor-wind";
    const { getByTestId } = render(
      <Router history={history}>
        <div data-testid="terms">
          <Link to="/">Home</Link>
          <Link to={`/pokemon/${pokemonMock}/moves/${moveMock}`}>Move</Link>
        </div>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    const wrapperNode = getByTestId("terms");
    const ancleNode = wrapperNode.childNodes[1];
    fireEvent.click(ancleNode);
    expect(history.location.pathname).toBe(
      `/pokemon/${pokemonMock}/moves/${moveMock}`
    );
  });

  it("Redirects to correct URL on click", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <Router history={history}>
        <NoMatch />
      </Router>
    );
    const wrapperNode = getByTestId("noMatch");
    const buttonNode = wrapperNode.childNodes[1];
    fireEvent.click(buttonNode);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/");
  });
});
