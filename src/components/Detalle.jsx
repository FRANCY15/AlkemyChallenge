import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

const Detalle = () => {

let token = sessionStorage.getItem("token");

let query = new URLSearchParams(window.location.search);
let movieID = query.get('movieID');

const [movie, setMovie] = useState(null);

useEffect(() => {
    const endPoint = `
    https://api.themoviedb.org/3/movie/${movieID}?api_key=5def1b1385a72611bb381b27fee25384&language=en-US`;

    console.log(endPoint)
    axios.get(endPoint)
    .then(response => {
      const movieData = response.data;
      setMovie(movieData)
    })
    .catch((error) => {
    new Swal({
      title: 'Error',
      text: 'No se puede encontrar la pelicula, por favor verifique la información',
      icon: 'error'
    })
    })

}, [movieID])


  return (
    <>
        { !token && <Navigate to='/' /> }
        { movie && ( 
          <>
          <h2>{movie.title}</h2>
          <div className="row">
              <div className="col-4">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid" alt="..." />
              </div>
              <div className="col-8">
                  <h5>Fecha de estreno: {movie.release_date}</h5>
                  <h5>Reseña: </h5>
                  <p>{ movie.overview}</p>
                  <h5>Rating: {movie.vote_average}</h5>
                  <h5>{movie.genres.map((oneGenre)=> <li key={oneGenre.id}>{oneGenre.name}</li>)}</h5>
              </div>
          </div>
        </>
        )}
    </>
  )
}

export default Detalle