import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useError } from "../context/ErrorContext";
import { useAuth } from "../context/AuthContext";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
  }, [isWatchLater]);

  const fetchMovies = async () => {
    try {
      let response;
      if (isWatchLater) {
        response = axios(`${import.meta.env.VITE_AUTH_URL}/watch-later`, {
          method: "GET",
          headers: {
            "accessToken": token,
          },
        });
      } else {
        response = await axios(import.meta.env.VITE_MOVIES_URL);
      }
      setMovieList(response.data);
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj(
        "apiError",
        `${error.message} : Error fetching movie details`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 py-5 xl:py-20 xl:px-48 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 min-h-max">
      {isLoading ? (
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        movieList.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              setMovieList={setMovieList}
              movieList={movieList}
              isWatchLater={isWatchLater}
            />
          );
        })
      )}

      {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })}
    </div>
  );
};

export default Dashboard;
