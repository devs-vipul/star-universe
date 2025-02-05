import React from "react";
import { render, screen } from "@testing-library/react";
import StarshipList from "../../components/StarshipList";
import { Starship } from "../../types";
import "@testing-library/jest-dom";

const starshipsMock: Starship[] = [
  {
    name: "Millennium Falcon",
    model: "YT-1300 light freighter",
    starship_class: "Light freighter",
    url: "https://swapi.dev/api/starships/10/",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "100000",
    length: "34.75",
    max_atmosphering_speed: "1050",
    crew: "4",
    passengers: "6",
    cargo_capacity: "100000",
    consumables: "2 months",
    hyperdrive_rating: "0.5",
    MGLT: "75",
    films: [],
    pilots: [],
    created: "2014-12-10T16:00:44.310000Z",
    edited: "2014-12-20T21:23:49.867000Z",
  },
  {
    name: "X-Copter",
    model: "T-65 X-wing starfighter",
    starship_class: "Starfighter",
    url: "https://swapi.dev/api/starships/11/",
    manufacturer: "Incom Corporation",
    cost_in_credits: "149999",
    length: "12.5",
    max_atmosphering_speed: "1050",
    crew: "1",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "100",
    films: [],
    pilots: [],
    created: "2014-12-10T16:00:44.310000Z",
    edited: "2014-12-20T21:23:49.867000Z",
  },
];

describe("StarshipList Component", () => {
  it("renders loading state", () => {
    render(<StarshipList starships={[]} loading={true} />);
    expect(screen.getAllByTestId("skeleton-loader")).toHaveLength(4);
  });

  it("renders starship names when starships are provided", () => {
    render(<StarshipList starships={starshipsMock} loading={false} />);
    expect(screen.getByText(/Millennium Falcon/i)).toBeInTheDocument();
    expect(screen.getByText(/X-Copter/i)).toBeInTheDocument();
  });

  it("renders no starships message when starships array is empty", () => {
    render(<StarshipList starships={[]} loading={false} />);
    expect(screen.getByText(/no starships piloted/i)).toBeInTheDocument();
  });
});
