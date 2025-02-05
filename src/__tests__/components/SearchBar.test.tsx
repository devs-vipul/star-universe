import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
  it("renders with the correct initial value", () => {
    const handleChange = jest.fn();
    render(<SearchBar value="Luke" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(
      /search characters.../i
    ) as HTMLInputElement;
    expect(input.value).toBe("Luke");
  });

  it("calls onChange with the correct value after typing", async () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={handleChange} />
    );

    const input = getByPlaceholderText("Search characters...");

    fireEvent.change(input, { target: { value: "Leia" } });

    // Wait for the debounce period (300ms)
    await waitFor(
      () => {
        expect(handleChange).toHaveBeenCalledWith("Leia");
      },
      { timeout: 400 }
    );
  });
});
