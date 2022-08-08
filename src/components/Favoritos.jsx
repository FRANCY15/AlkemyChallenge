import { Link, Navigate } from "react-router-dom";


const Favoritos = ({favoritos, addOrRemoveFavs}) => {
  let token = sessionStorage.getItem("token");
    
  return (
    <>
    {!token && <Navigate to="/" />}
    <div className="row">
      { !favoritos.length && <div className="col-12 text-danger"> No tienes favoritos aún!</div>}
        {favoritos.map((movie, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card my-4">
                <img
                  src={movie.imgUrl}
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
  )
}

export default Favoritos