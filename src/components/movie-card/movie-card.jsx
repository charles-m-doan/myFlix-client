import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.ImagePath} alt={"Poster for : " + movie.Title} /> ,
      <h2> {movie.Title} </h2>
      <div> {"Director: " + movie.Director.Name} </div>
      <span>____________________________________</span>
      <br /> <br /> <br />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Director: PropTypes.object
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};