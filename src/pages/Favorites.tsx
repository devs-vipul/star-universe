import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2, Earth } from "lucide-react";
import { useCharacterContext } from "../context/CharacterContext";
import { Character, Planet } from "../types";
import { useToast } from "../context/ToastContext";
import { getPlanet } from "../lib/api";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { favorites, planets, setPlanets, removeFavorite, updateCharacter } =
    useCharacterContext();
  const [editingCharacter, setEditingCharacter] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Character>>({});
  const [loadingPlanets, setLoadingPlanets] = useState(false);

  // Fetch missing homeworlds if not in context
  useEffect(() => {
    const fetchMissingHomeworlds = async () => {
      setLoadingPlanets(true);

      const missingHomeworlds = [
        ...new Set(
          favorites
            .map((char) => char.homeworld)
            .filter((homeworld) => homeworld && !planets[homeworld])
        ),
      ];

      if (missingHomeworlds.length > 0) {
        try {
          console.log("Fetching missing homeworlds:", missingHomeworlds);
          const fetchedPlanets = await Promise.all(
            missingHomeworlds.map((url) => getPlanet(url))
          );

          const newPlanets = fetchedPlanets.reduce((acc, planet) => {
            acc[planet.url] = planet;
            return acc;
          }, {} as Record<string, Planet>);

          setPlanets((prev: Record<string, Planet>) => ({
            ...prev,
            ...newPlanets,
          }));
        } catch (error) {
          console.error("Error fetching missing homeworlds:", error);
        }
      }
      setLoadingPlanets(false);
    };

    if (favorites.length > 0) {
      fetchMissingHomeworlds();
    }
  }, [favorites, planets, setPlanets]);

  const handleEdit = (character: Character, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingCharacter(character.url);
    setEditForm({
      height: character.height,
      gender: character.gender,
    });
  };

  const handleDelete = (url: string, name: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFavorite(url);
    showToast(`Removed ${name} from favourites`);
  };

  const handleSave = (url: string) => {
    updateCharacter(url, editForm);
    setEditingCharacter(null);
    setEditForm({});
    showToast(`Details Updated!`);
  };

  if (favorites && favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">No Favorites Yet</h2>
        <p className="text-text-muted">
          Start adding characters to your favorites list!
        </p>
      </div>
    );
  }

  return (
    <div className="favorite-card space-y-6">
      <h1 className="text-2xl font-bold text-background-active">
        Favourite Characters
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites &&
          favorites.map((character) => (
            <div
              key={character.url}
              onClick={() =>
                navigate(
                  `/character/${character.url.split("/").slice(-2, -1)[0]}`
                )
              }
              className="border-l-4 border-background-active cursor-pointer bg-background-elevated p-6 rounded-lg capitalize shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col items-start justify-start gap-1">
                  <h2 className="text-lg font-semibold text-text-primary">
                    {character.name}
                  </h2>
                  <p className="text-text-muted flex items-center gap-2">
                    <Earth size={14} />
                    {loadingPlanets
                      ? "Loading..."
                      : planets[character.homeworld]?.name}
                  </p>
                </div>
                <div className="flex gap-2 items-center capitalize">
                  <button
                    data-testid="edit"
                    onClick={(event) => handleEdit(character, event)}
                    className="p-1 rounded text-text-muted hover:bg-gray-100 hover:text-black"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    data-testid="remove"
                    onClick={(event) =>
                      handleDelete(character.url, character.name, event)
                    }
                    className="p-1 rounded hover:bg-gray-100 text-background-active"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {editingCharacter === character.url ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-semibold text-text-muted">
                      Height
                    </label>
                    <input
                      type="text"
                      value={editForm.height || ""}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setEditForm({ ...editForm, height: e.target.value });
                      }}
                      className="bg-transparent border border-background-muted mt-1 block w-full rounded-md shadow-sm focus:border-background-muted focus:ring-gray-900 text-white text-sm p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-semibold text-text-muted">
                      Gender
                    </label>
                    <input
                      type="text"
                      value={editForm.gender || ""}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setEditForm({ ...editForm, gender: e.target.value });
                      }}
                      className="bg-transparent border border-background-muted mt-1 block w-full rounded-md shadow-sm focus:border-background-muted focus:ring-gray-900 text-white text-sm p-2"
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(character.url);
                    }}
                    className="col-span-2 w-full py-2 px-4 text-text-primary rounded-md bg-gray-800 hover:bg-gray-900"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-text-muted">
                    Height:{" "}
                    <span className="font-medium">
                      {character.height}&nbsp;cm
                    </span>
                  </p>
                  <p className="font-semibold text-text-muted">
                    Gender:{" "}
                    <span className="font-medium">{character.gender}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
