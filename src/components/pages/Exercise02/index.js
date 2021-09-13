/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [moviesRender, setMoviesRender] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [order, setOrder] = useState("");

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setMoviesRender(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleGenresFetch = () => {
    console.log("Getting genres");
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  useEffect(() => {
    handleMovieFetch();
    handleGenresFetch();
  }, []);

  useEffect(() => {
    moviesFilter();
  }, [filter]);


  useEffect(() => {
    moviesOrder();
  }, [order]);

  const handleFilter = function (e) {
    setFilter(e.target.value);
  };

  const moviesFilter = function (e) {
    setOrder('');
    if (filter === "Todas") {
      setMoviesRender(movies);
    } else {
      let moviesFilter = movies.filter((m) => m.genres.includes(filter));
      console.log("aaaaa", moviesFilter);
      setMoviesRender(moviesFilter);
    }
  };

  const moviesOrder = function (order) {
    let moviesOrdened = moviesRender;
    if (order === "Descending") {
      moviesOrdened.sort(function (a, b) {
        if (a.year < b.year) {
          return 1;
        }
        if (a.year > b.year) {
          return -1;
        }
        return 0;
      });
    }
    if (order === "Ascending") {
      moviesOrdened.sort(function (a, b) {
        if (a.year > b.year) {
          return 1;
        }
        if (a.year < b.year) {
          return -1;
        }
        return 0;
      });
    }
    setMoviesRender(moviesOrdened);
  };
  return (
    <section className="movie-library">
      <div className="movie-library__image">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            placeholder="Search by genre..."
            onChange={handleFilter}
          >
            <option value="Todas">Todas</option>
            {genres.map((o, i) => (
              <option value={o} key={i}>
                {o}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setOrder("Descending");
              moviesOrder("Descending");
            }}
            className={order === "Descending" ? "orderSelected" : "order"}
          >
            Year Descending
          </button>
          <button
            onClick={() => {
              setOrder("Ascending");
              moviesOrder("Ascending");
            }}
            className={order === "Ascending" ? "orderSelected" : "order"}
            id="button2"
          >
            Year Ascending
          </button>
        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {moviesRender.map((movie) => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul className="movie-library__info">
                <li id="title">{movie.title}</li>
                <li>{movie.genres.join(", ")}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
