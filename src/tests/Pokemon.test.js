import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";
import Pokemon from "../Pokemon";

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("Testing Pokemon Component", () => {
  it("should render Pokemon Component", () => {
    const pokemonMock = "pikachu";
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[`/pokemon/${pokemonMock}`]}>
        <Route path="/pokemon/:name">
          <Pokemon />
        </Route>
      </MemoryRouter>
    );
    expect(getByTestId("pokemonId")).toBeTruthy();
  });

  it("should show name of the pokemon", () => {
    const pokemonMock = "bulbasaur";
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[`/pokemon/${pokemonMock}`]}>
        <Route path="/pokemon/:name">
          <Pokemon />
        </Route>
      </MemoryRouter>
    );
    const wrapperNode = getByTestId("pokemonId");
    const textNode = wrapperNode.childNodes[0].childNodes[1].childNodes[0];
    expect(textNode.textContent).toEqual(pokemonMock);
  });
});
