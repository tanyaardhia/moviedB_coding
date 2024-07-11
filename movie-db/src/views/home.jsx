import { useEffect, useState } from "react";
import axios from "axios";
import Barcode from "react-barcode";

export function Home() {
  const [getData, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <div className="flex flex-col md:flex-row justify-between">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ul className="list-disc pl-5 md:w-1/2">
            {getData.map((movie) => (
              <li
                key={movie.id}
                className="cursor-pointer hover:text-blue-500 mb-2"
                onClick={() => handleMovie(movie)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}

        {selectedMovie && (
          <div className="mt-4 md:mt-0 md:ml-10 flex-shrink-0 md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Selected Movie</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="mb-4 rounded-lg shadow-lg w-full md:w-96 h-96"
            />
            <p className="mb-2">
              <strong>Title:</strong> {selectedMovie.title}
            </p>
            <p className="mb-2 w-96">
              <strong>Overview:</strong> {selectedMovie.overview}
            </p>
            <Barcode value={`TICKET-${selectedMovie.id}`} />
          </div>
        )}
      </div>
    </div>

);
}
