import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { getFilm, getStarship, getCharacter } from "../lib/api";
import { useCharacterContext } from "../context/CharacterContext";
import type { Film, Starship, Character } from "../types/api";
import StarshipList from "../components/StarshipList";
import FilmList from "../components/FilmList";
import { useToast } from "../context/ToastContext";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    characters,
    favorites,
    addFavorite,
    removeFavorite,
    planets,
    setCharacters,
  } = useCharacterContext();
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const [character, setCharacter] = useState<Character | null>(null);

  const isFavorite = favorites.some((f) => f.url === character?.url);

  const fetchRelatedData = useCallback(async (character: Character) => {
    setLoading(true);
    setError(null);
    try {
      const [filmsData, starshipsData] = await Promise.all([
        Promise.all(character.films.map(getFilm)),
        Promise.all(character.starships.map(getStarship)),
      ]);
      setFilms(filmsData);
      setStarships(starshipsData);
    } catch (err) {
      console.error("Error fetching related data:", err);
      setError(
        "Failed to load some character details. Please try again later."
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        let char = characters.find((char) =>
          char.url.includes(`/people/${id}/`)
        );

        if (!char) {
          char = await getCharacter(id!);
          setCharacters([...characters, char]);
        }

        setCharacter(char);
        await fetchRelatedData(char);
      } catch (err) {
        console.error("Error fetching character:", err);
        setError("Failed to load character details. Please try again later.");
      }
      setLoading(false);
    };

    fetchCharacter();
  }, [id, characters, setCharacters, fetchRelatedData]);

  if (!character) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Character not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-text-muted hover:text-white flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Characters
        </button>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character.url);
      showToast(`Removed ${character.name} from favourites`);
    } else {
      addFavorite(character);
      showToast(`Added ${character.name} to favourites`);
    }
  };

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate("/")}
        className="text-text-muted hover:text-white flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Characters
      </button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl text-background-active font-bold mb-2">
            {character.name}
          </h1>
          <p className="text-text-muted">
            From {planets[character.homeworld]?.name || "Unknown Planet"}
          </p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full ${
            isFavorite ? "text-background-active" : "text-gray-400"
          }`}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="capitalize">
        <div className="grid grid-cols-3 gap-4 bg-background-elevated p-6 rounded-lg shadow-md">
          <p className="text-text-muted">
            <span className="font-medium text-white">Hair Color:</span>{" "}
            {character.hair_color}
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-white">Eye Color:</span>{" "}
            {character.eye_color}
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-white">Gender:</span>{" "}
            {character.gender}
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-white">Height:</span>{" "}
            {character.height}cm
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-white">Mass:</span>{" "}
            {character.mass
              ? character.mass != "unknown"
                ? `${character.mass} Kg`
                : "-"
              : "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StarshipList starships={starships} loading={loading} />
        <FilmList films={films} loading={loading} />
      </div>
    </div>
  );
};

export default CharacterDetails;
