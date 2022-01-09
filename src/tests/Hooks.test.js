import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PokemonsMock from "./mocks/PokemonsMock.json";
import PokemonMock from "./mocks/PokemonMock.json";
import MoveMock from "./mocks/MoveMock.json";
import { usePokemons } from "../hooks/usePokemons";
import { usePokemon } from "../hooks/usePokemon";
import { useMove } from "../hooks/useMove";

describe("When call usePokemons hook", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });
  it("should call API and get count of pages", async () => {
    const pokemonsMock = PokemonsMock;
    const url = "https://pokeapi.co/api/v2/pokemon";
    mock.onGet(url).reply(200, pokemonsMock);
    const { result, waitForNextUpdate } = renderHook(() => usePokemons());

    act(() => {
      result.current.loadMore(1);
    });
    await waitForNextUpdate();

    expect(result.current.count).toEqual(55);
  });

  it("should call API and get pokemons", async () => {
    const pokemonsMock = PokemonsMock;
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    mock.onGet(url).reply(200, pokemonsMock);
    const { result, waitForNextUpdate } = renderHook(() => usePokemons());

    act(() => {
      result.current.loadMore(0);
    });
    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual(pokemonsMock.results);
  });
});

describe("When call usePokemon hook", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });
  it("should call API and get pokemon", async () => {
    const pokemonMock = PokemonMock;
    const pokemonNameMock = "bulbasaur";
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameMock}/`;
    mock.onGet(url).reply(200, pokemonMock);

    const { result, waitForNextUpdate } = renderHook(usePokemon, {
      initialProps: { url },
    });

    expect(result.current.pokemon).toEqual(null);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.pokemon).toEqual(pokemonMock);
  });
});

describe("When call useMove hook", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });
  it("should call API and get pokemon move", async () => {
    const moveMock = MoveMock;
    const pokemonNameMock = "bulbasaur";
    const moveNameMock = "razor-wind";
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameMock}/moves/${moveNameMock}`;
    mock.onGet(url).reply(200, moveMock);

    const { result, waitForNextUpdate } = renderHook(useMove, {
      initialProps: { url },
    });

    expect(result.current.move).toEqual(null);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.move).toEqual(moveMock);
  });
});
