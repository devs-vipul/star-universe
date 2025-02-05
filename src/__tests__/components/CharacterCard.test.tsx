import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "../../components/CharacterCard";
import { CharacterProvider } from "../../context/CharacterContext";
import "@testing-library/jest-dom";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ToastProvider } from "../../context/ToastContext";

const characterMock = {
  url: "https://swapi.dev/api/people/1/",
  name: "Luke Skywalker",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  starships: [],
  vehicles: [],
  films: [],
  species: [],
  created: "2021-01-01T00:00:00Z",
  edited: "2021-01-01T00:00:00Z",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CharacterCard Component", () => {
  it("renders character details", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <CharacterProvider>
            <CharacterCard character={characterMock} />
          </CharacterProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  it("displays planet name or 'Loading...'", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <CharacterProvider>
            <CharacterCard character={characterMock} />
          </CharacterProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("toggles favorite state on heart icon click", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <CharacterProvider>
            <CharacterCard character={characterMock} />
          </CharacterProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);

    expect(heartButton).toHaveClass("text-background-active");
  });

  it("navigates to character detail on click", () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <ToastProvider>
          <CharacterProvider>
            <CharacterCard character={characterMock} />
          </CharacterProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    const card = screen.getByText(/Luke Skywalker/i);
    fireEvent.click(card);

    expect(navigateMock).toHaveBeenCalledWith("/character/1");
  });
});
