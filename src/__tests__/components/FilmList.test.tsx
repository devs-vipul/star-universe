import React from "react";
import { render, screen } from "@testing-library/react";
import FilmList from "../../components/FilmList";
import { Film } from "../../types";
import "@testing-library/jest-dom";

const filmsMock: Film[] = [
  {
    title: "A New Hope",
    release_date: "1977-05-25",
    url: "https://swapi.dev/api/films/1/",
    episode_id: 4,
    opening_crawl: "It is a period of civil war...",
    director: "George Lucas",
    producer: "Gary Kurtz, George Lucas",
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T21:17:56.891000Z",
  },
  {
    title: "The Empire Strikes Back",
    release_date: "1980-05-21",
    url: "https://swapi.dev/api/films/2/",
    episode_id: 5,
    opening_crawl: "It is a dark time for the Rebellion...",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, George Lucas",
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T21:17:56.891000Z",
  },
];

describe("FilmList Component", () => {
  it("renders loading state", () => {
    render(<FilmList films={[]} loading={true} />);

    expect(screen.getAllByTestId("skeleton-loader")).toHaveLength(4);
  });

  it("renders film titles when films are provided", () => {
    render(<FilmList films={filmsMock} loading={false} />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
  });

  it("renders no films available message when films array is empty", () => {
    render(<FilmList films={[]} loading={false} />);

    expect(screen.getByText(/no films available/i)).toBeInTheDocument();
  });
});
