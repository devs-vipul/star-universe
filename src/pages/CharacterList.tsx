import React, { useEffect, useState } from "react";
import { getCharacters, getPlanet } from "../lib/api";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useCharacterContext } from "../context/CharacterContext";
import { Planet } from "../types/api";
import CharacterCard from "../components/CharacterCard";
import SkeletonLoader from "../components/SkeletonLoader";

const CharacterList: React.FC = () => {
  const { characters, setCharacters, setPlanets } = useCharacterContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters(page, search);
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));

        const uniquePlanets = [
          ...new Set(data.results.map((char) => char.homeworld)),
        ];
        const planetData = await Promise.all(
          uniquePlanets.map((url) => getPlanet(url))
        );

        const planetMap = planetData.reduce((acc, planet) => {
          acc[planet.url] = planet;
          return acc;
        }, {} as Record<string, Planet>);

        setPlanets(planetMap);
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters. Please try again later.");
      }
      setLoading(false);
    };

    fetchData();
  }, [page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-gray-900 hover:text-gray-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-background-active">
        All Characters
      </h1>
      <SearchBar value={search} onChange={handleSearch} />

      {characters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">No characters found</p>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonLoader key={i} type="characterCard" />
              ))}
            </div>
          ) : (
            <>
              {characters.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-muted">No characters found</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {characters.map((character) => (
                    <CharacterCard key={character.url} character={character} />
                  ))}
                </div>
              )}

              {characters.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;
