import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Resultados = () => {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
    const [moviesResult, setMoviesResult] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=5def1b1385a72611bb381b27fee25384&language=en-US&query=${keyword}`;
        axios.get(endPoint)
        .then((res) => {
            const moviesArray = res.data.results;
            if(moviesArray.length === 0){
              new Swal ({
                title: 'Error',
                text: 'Tu búsqueda no arrojó resultados',
                icon: 'error'
              })
            }
            setMoviesResult(moviesArray)
        })
        .catch((error) => console.log(error))
    }, [keyword])
    

  return (
    <>
    <h2>Buscaste: <em>{keyword}</em></h2>
    {moviesResult.length === 0 && <h3>No hay resultado de la búsqueda</h3>}
        <div className="row">
      {
        moviesResult.map((movie, index) => {
          return (
                <div className="col-3" key={index}>
                  <div className="card my-4" >
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title.substring(0,20)}</h5>
                      {/* <p className="card-text">
                        {movie.overview.substring(0,80)}
                      </p> */}
                      <Link className="btn btn primary" to={`/detalle?movieID=${movie.id}`}>View detail...</Link>
                    </div>
                  </div>
                </div>
          )
        })
      }
      </div>
    </>
  )
}

export default Resultados