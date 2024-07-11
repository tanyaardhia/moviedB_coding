import { useEffect, useState } from "react";
import axios from "axios";
import Barcode from "react-barcode";

export function Home() {
  const [getData, setData] = useState([]);
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

  return (
    <>
      <h1>Movie List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {getData.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
