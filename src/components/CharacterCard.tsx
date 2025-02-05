import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../types";
import { useCharacterContext } from "../context/CharacterContext";
import { Earth, Heart } from "lucide-react";
import { useToast } from "../context/ToastContext";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { planets, favorites, addFavorite, removeFavorite } =
    useCharacterContext();

  const [isFavorite, setIsFavorite] = React.useState(
    favorites.some((f) => f.url === character.url)
  );

  const handleClick = () => {
    navigate(`/character/${character.url.split("/").slice(-2, -1)[0]}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(character.url);
      showToast(`Removed ${character.name} from favourites`);
    } else {
      addFavorite(character);
      showToast(`Added ${character.name} to favourites`);
    }
    setIsFavorite(!isFavorite);
  };

  const genderDisplay =
    character.gender === "male" ? (
      <span>&#9794; {character.gender}</span>
    ) : character.gender === "female" ? (
      <span>&#9792; {character.gender}</span>
    ) : (
      <span>&#10067; Unknown</span>
    );

  return (
    <div
      onClick={handleClick}
      className="character-card flex flex-col gap-6 bg-background-elevated capitalize p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          {character.name}
        </h2>
        <button
          onClick={toggleFavorite}
          className={`rounded-full ${
            isFavorite ? "text-background-active" : "text-gray-400"
          }`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-text-muted flex items-center gap-2">
          {genderDisplay}
        </p>
        <p className="text-text-muted flex items-center gap-2">
          <Earth size={14} />{" "}
          {planets[character.homeworld]?.name || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CharacterCard);
