import { useEffect, useState } from "react";
import axios from "axios";
import Barcode from "react-barcode";

export function Home() {
  const [getData, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const api = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_MOVIE}`,
          },
        }
      );

      console.log(api.data, ">>> result");
      setData(api.data.results);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Movie List</h1>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ul className="list-disc pl-5">
            {getData.map((movie) => (
              <li
                key={movie.id}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => handleMovie(movie)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}

        {selectedMovie && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Selected Movie</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="mb-4 rounded-lg shadow-lg"
            />
            <p className="mb-2">
              <strong>Title:</strong> {selectedMovie.title}
            </p>
            <p className="mb-2">
              <strong>Overview:</strong> {selectedMovie.overview}
            </p>
            <Barcode value={`TICKET-${selectedMovie.id}`} />
          </div>
        )}
      </div>
    </>
  );
}
