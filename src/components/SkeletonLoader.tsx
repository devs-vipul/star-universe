import React from "react";

interface SkeletonLoaderProps {
  type?: "characterCard" | "starships" | "films";
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  if (type === "characterCard") {
    return (
      <div
        data-testid="skeleton-loader"
        className="bg-background-elevated p-6 rounded-lg shadow-md animate-pulse"
      >
        <div className="h-6 bg-background-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-background-muted rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-background-muted rounded w-2/3"></div>
      </div>
    );
  }

  if (type === "starships") {
    return (
      <div
        data-testid="skeleton-loader"
        className="flex flex-col gap-2 bg-background-elevated px-6 py-4 rounded-lg shadow-md animate-pulse"
      >
        <div className="h-6 bg-background-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-background-muted rounded w-1/2"></div>
        <div className="h-4 bg-background-muted rounded w-2/3"></div>
      </div>
    );
  }

  if (type === "films") {
    return (
      <div
        data-testid="skeleton-loader"
        className="pb-4 flex flex-col gap-2 border-b last:border-b-0 animate-pulse"
      >
        <div className="h-6 bg-background-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-background-muted rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-6 bg-background-muted rounded w-3/4"></div>
      <div className="h-4 bg-background-muted rounded w-1/2"></div>
      <div className="h-4 bg-background-muted rounded w-2/3"></div>
    </div>
  );
};

export default SkeletonLoader;
