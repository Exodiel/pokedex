import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Home from "../Home";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("Testing Home Component", () => {
  const home = shallow(<Home />);
  it("should render a <Typography /> component", () => {
    expect(home.find(Typography)).toHaveLength(1);
  });

  it("should render a <Pagination /> component", () => {
    expect(home.find(Pagination)).toHaveLength(1);
  });

  it("should call almost once handleChangePage", () => {
    let countMock = 2;
    let pageMock = 1;
    let handleChangePageMock = jest.fn();

    const { getByTestId } = render(
      <div>
        <Pagination
          data-testid="my-wrapper"
          size="large"
          count={countMock}
          page={pageMock}
          onChange={handleChangePageMock}
        />
      </div>
    );
    const wrapperNode = getByTestId("my-wrapper");
    const navNode = wrapperNode.childNodes[0].childNodes[2].childNodes[0];
    fireEvent.click(navNode);
    expect(handleChangePageMock.mock.calls).toHaveLength(1);
  });
});
