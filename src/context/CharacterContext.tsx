import React, { createContext, useContext, useState } from "react";
import type { Character, Planet } from "../types/api";

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

  const addFavorite = (character: Character) => {
    setFavorites((prev) => [...prev, character]);
  };

  const removeFavorite = (url: string) => {
    setFavorites((prev) => prev.filter((char) => char.url !== url));
  };

  const updateCharacter = (url: string, updates: Partial<Character>) => {
    setFavorites((prev) =>
      prev.map((char) => (char.url === url ? { ...char, ...updates } : char))
    );
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
