import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Listado from "../src/components/Listado";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import { useState, useEffect } from "react";

import "./App.css";
import Favoritos from "./components/Favoritos";

function App() {

  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
      const favInLocal = localStorage.getItem('favs');
      if(favInLocal !== null){
          const favsArray = JSON.parse(favInLocal);
          setFavoritos(favsArray)
      }

  }, [])
  

  const favMovies = localStorage.getItem("favs");

  let tempMoviesFav;

  if (favMovies === null) {
    tempMoviesFav = [];
  } else {
    tempMoviesFav = JSON.parse(favMovies);
  }

  console.log("soy fav", tempMoviesFav);

  const addOrRemoveFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgUrl,
      title,
      overview,
      id: btn.dataset.movieId,
    };

    let movieIsInArray = tempMoviesFav.find(oneMovie =>{
      return oneMovie.id === movieData.id
    });
    
    
    if(!movieIsInArray){
      tempMoviesFav.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesFav));
      setFavoritos(tempMoviesFav);
      console.log('Se agregó la pelicula')
    }else{
      let removeMovie = tempMoviesFav.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(removeMovie));
      setFavoritos(removeMovie);
      console.log('se eliminó la película')
    }
  };

  return (
    <Routes>
      <Route path="/Listado" element={<Listado addOrRemoveFavs={addOrRemoveFavs} />} />
      <Route exact path="/" element={<Login />} />
      <Route path="/Detalle" element={<Detalle />} />
      <Route path="/Resultados" element={<Resultados />} />
      <Route path="/Favoritos" element={<Favoritos favoritos={favoritos} addOrRemoveFavs={addOrRemoveFavs} />}/>
    </Routes>
  );
}

export default App;
