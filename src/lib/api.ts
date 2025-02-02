import axios from "axios";
import type {
  ApiResponse,
  Character,
  Film,
  Planet,
  Starship,
} from "../types/api";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const getCharacters = (page = 1, search = "") => {
  const params = new URLSearchParams();
  if (page > 1) params.append("page", page.toString());
  if (search) params.append("search", search);

  return api.get<never, ApiResponse<Character>>(`/people?${params.toString()}`);
};

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }
  return response.json();
};

export const getPlanet = (url: string) => {
  return api.get<never, Planet>(url);
};

export const getFilm = (url: string) => {
  return api.get<never, Film>(url);
};

export const getStarship = (url: string) => {
  return api.get<never, Starship>(url);
};
