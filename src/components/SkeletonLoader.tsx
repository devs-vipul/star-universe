import React from "react";

interface SkeletonLoaderProps {
  type?: "characterCard";
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  if (type === "characterCard") {
    return (
      <div className="bg-background-elevated p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-background-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-background-muted rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-background-muted rounded w-2/3"></div>
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
