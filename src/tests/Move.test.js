import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";
import Move from "../Move";

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("Testing Move Component", () => {
  it("should render Pokemon Component", () => {
    const pokemonMock = "bulbasaur";
    const moveMock = "razor-wind";
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[`/pokemon/${pokemonMock}/moves/${moveMock}`]}
      >
        <Route path="/pokemon/:poke/moves/:name">
          <Move />
        </Route>
      </MemoryRouter>
    );
    expect(getByTestId("moveId")).toBeTruthy();
  });

  it("should show name of the move", () => {
    const pokemonMock = "bulbasaur";
    const moveMock = "razor-wind";
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[`/pokemon/${pokemonMock}/moves/${moveMock}`]}
      >
        <Route path="/pokemon/:poke/moves/:name">
          <Move />
        </Route>
      </MemoryRouter>
    );
    const wrapperNode = getByTestId("moveId");
    const textNode = wrapperNode.childNodes[0].childNodes[1].childNodes[0];
    expect(textNode.textContent).toEqual(moveMock);
  });
});
