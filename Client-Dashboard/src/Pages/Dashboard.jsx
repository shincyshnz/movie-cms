import React, { useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";

const Dashboard = () => {
  return (
    <div className="px-10 py-5 xl:py-20 xl:px-48 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default Dashboard;
