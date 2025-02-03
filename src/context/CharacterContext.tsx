import React, { createContext, useContext, useEffect, useState } from "react";
import type { Character, Planet } from "../types";

interface CharacterContextType {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (url: string) => void;
  updateCharacter: (url: string, updates: Partial<Character>) => void;
  planets: Record<string, Planet>;
  setPlanets: (planets: Record<string, Planet>) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Record<string, Planet>>({});

  // Load favorites from local storage on app load
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (character: Character) => {
    const updatedFavorites = [...favorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (url: string) => {
    const updatedFavorites = favorites.filter((char) => char.url !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const updateCharacter = (url: string, updates: Partial<Character>) => {
    const updatedFavorites = favorites.map((char) =>
      char.url === url ? { ...char, ...updates } : char
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        favorites,
        addFavorite,
        removeFavorite,
        updateCharacter,
        planets,
        setPlanets,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext Error!");
  }
  return context;
};
