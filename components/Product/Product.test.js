import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";

import { mockProduct } from "../../__mocks__/mockProducts";

describe("Product Component", () => {
  it("renders product correctly", () => {
    const addToCart = jest.fn();
    render(<Product product={mockProduct} addToCart={addToCart} />);
    screen.getByText(/Monitor/i);
    screen.getByText(/₹850/i);
    const addtocartBtn = screen.getByRole("button", { name: /Add to cart/i });

    userEvent.click(addtocartBtn);
  });
});
