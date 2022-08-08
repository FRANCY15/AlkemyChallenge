import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Listado = ({addOrRemoveFavs}) => {
  let token = sessionStorage.getItem("token");

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=5def1b1385a72611bb381b27fee25384&language=es-ES&page=1";

    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMovieList(apiData.results);
      })
      .catch((error) => {
        new Swal({
          title: "Error",
          text: "Hubo errores, por favor intenta más tarde",
          icon: "error",
        });
      });
  }, [setMovieList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="row">
        {movieList.map((movie, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <button className="favorite-btn"
                onClick={addOrRemoveFavs}
                data-movie-id={movie.id}>🖤</button>
                <div className="card-body">
                  <h5 className="card-title">{movie.title.substring(0, 20)}</h5>
                  <p className="card-text">{movie.overview.substring(0, 80)}</p>
                  <Link
                    className="btn primary"
                    to={`/detalle?movieID=${movie.id}`}
                  >
                    View detail...
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listado;
