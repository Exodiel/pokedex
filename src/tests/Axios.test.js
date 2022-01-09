import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import PokemonsMock from "./mocks/PokemonsMock.json";
import PokemonMock from "./mocks/PokemonMock.json";
import MoveMock from "./mocks/MoveMock.json";

describe("Axios Test", () => {
  let mock;
  
  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });
  const basePokemonApiUrl = "https://pokeapi.co/api/v2/pokemon";
  describe("when API get pokemons successful", () => {
    it("should load pokemons", async () => {
      const pokemonsMock = PokemonsMock;
      mock.onGet(basePokemonApiUrl).reply(200, pokemonsMock);
  
      let result = await axios.get(basePokemonApiUrl);
  
      expect(mock.history.get[0].url).toEqual(basePokemonApiUrl);
      expect(result.data).toEqual(pokemonsMock);
    });
  });

  describe("when API get pokemon by name successfully", () => {
    it("should load pokemon by name", async () => {
      const pokemonMock = PokemonMock;
      const pokemonName = "bulbasaur";
      const path = `${basePokemonApiUrl}/${pokemonName}/`;
      mock.onGet(path).reply(200, pokemonMock);
  
      let result = await axios.get(path);
  
      expect(mock.history.get[0].url).toEqual(path);
      expect(result.data).toEqual(pokemonMock);
    });
  });

  describe("when API get move successfully", () => {
    it("should load move by name", async () => {
      const moveMock = MoveMock;
      const pokemonMove = "razor-wind";
      const path = `${basePokemonApiUrl}/move/${pokemonMove}/`;
      mock.onGet(path).reply(200, moveMock);
  
      let result = await axios.get(path);
  
      expect(mock.history.get[0].url).toEqual(path);
      expect(result.data).toEqual(moveMock);
    });
  });

});
