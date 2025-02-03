import React from "react";
import type { Film } from "../types";
import SkeletonLoader from "./SkeletonLoader";

interface FilmListProps {
  films: Film[];
  loading: boolean;
}

const FilmList: React.FC<FilmListProps> = ({ films, loading }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-white">Films</h2>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar max-h-[400px]">
          {[...Array(4)].map((_, index) => (
            <SkeletonLoader key={index} type="films" />
          ))}
        </div>
      ) : films.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 bg-background-elevated px-6 py-4 rounded-lg shadow-md overflow-y-auto custom-scrollbar max-h-[400px]">
          {films.map((film) => (
            <div
              key={film.url}
              className="pb-4 flex flex-col gap-2 border-b last:border-b-0"
            >
              <p className="text-lg font-semibold text-background-active">
                {film.title}
              </p>
              <p className="text-sm text-white">
                Released:{" "}
                <span className="text-text-muted">{film.release_date}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-muted">No films available</p>
      )}
    </div>
  );
};

export default FilmList;
