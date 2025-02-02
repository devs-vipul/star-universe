import React from "react";
import type { Starship } from "../types/api";

interface StarshipListProps {
  starships: Starship[];
  loading: boolean;
}

const StarshipList: React.FC<StarshipListProps> = ({ starships, loading }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-white">Starships</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      ) : starships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar max-h-[400px]">
          {starships.map((starship) => (
            <div
              key={starship.url}
              className="flex flex-col gap-2 bg-background-elevated px-6 py-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold text-background-active">
                {starship.name}
              </p>
              <p className="text-sm text-white">
                Model: <span className="text-text-muted">{starship.model}</span>
              </p>
              <p className="text-sm text-white">
                Class:{" "}
                <span className="text-text-muted">
                  {starship.starship_class}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-background-elevated p-6 rounded-lg shadow-md">
          <p className="text-text-muted">No starships piloted</p>
        </div>
      )}
    </div>
  );
};

export default StarshipList;
